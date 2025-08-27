import React, { createContext, useContext, useState } from 'react';
import { Movie, Person, Review } from '../types';
// Switched to API-driven data

interface MovieContextType {
  movies: Movie[];
  people: Person[];
  searchMovies: (query: string) => Movie[];
  searchPeople: (query: string) => Person[];
  addReview: (movieId: string, review: Review) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  React.useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    Promise.all([
      fetch(`${baseUrl}/api/movies`).then(r => r.json()),
      fetch(`${baseUrl}/api/people`).then(r => r.json())
    ]).then(([moviesRes, peopleRes]) => {
      const normalizedMovies: Movie[] = (moviesRes as any[]).map((m: any) => ({
        ...m,
        id: String(m.id),
        releaseYear: typeof m.releaseYear === 'number' ? m.releaseYear : Number(m.releaseYear ?? 0),
        duration: typeof m.duration === 'number' ? m.duration : Number(m.duration ?? 0),
        rating: typeof m.rating === 'number' ? m.rating : Number(m.rating ?? 0),
        reviews: (m.reviews || []).map((rev: any) => ({ ...rev, id: String(rev.id), movieId: String(rev.movieId) }))
      }));
      const normalizedPeople: Person[] = (peopleRes as any[]).map((p: any) => ({
        ...p,
        id: String(p.id)
      }));
      setMovies(normalizedMovies);
      setPeople(normalizedPeople);
    }).catch(() => {
      // ignore for now
    });
  }, []);

  const searchMovies = (query: string): Movie[] => {
    const lowercaseQuery = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery)) ||
      movie.cast?.some(actor => actor.toLowerCase().includes(lowercaseQuery)) ||
      movie.crew?.some(member => member.toLowerCase().includes(lowercaseQuery))
    );
  };

  const searchPeople = (query: string): Person[] => {
    const lowercaseQuery = query.toLowerCase();
    return people.filter(person =>
      person.name.toLowerCase().includes(lowercaseQuery) ||
      person.roles.some(role => role.toLowerCase().includes(lowercaseQuery))
    );
  };

  const addReview = (movieId: string, review: Review) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    fetch(`${baseUrl}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movieId: Number(movieId),
        userId: Number(review.userId),
        username: review.username,
        rating: review.rating,
        comment: review.comment
      })
    })
      .then(r => r.json())
      .then(() => {
        // Refresh the movie to get recalculated rating and reviews
        return fetch(`${baseUrl}/api/movies/${movieId}`).then(r => r.json());
      })
      .then((updatedMovie: any) => {
        const normalized: Movie = {
          ...updatedMovie,
          id: String(updatedMovie.id),
          releaseYear: typeof updatedMovie.releaseYear === 'number' ? updatedMovie.releaseYear : Number(updatedMovie.releaseYear ?? 0),
          duration: typeof updatedMovie.duration === 'number' ? updatedMovie.duration : Number(updatedMovie.duration ?? 0),
          rating: typeof updatedMovie.rating === 'number' ? updatedMovie.rating : Number(updatedMovie.rating ?? 0),
          reviews: (updatedMovie.reviews || []).map((rev: any) => ({ ...rev, id: String(rev.id), movieId: String(rev.movieId) }))
        };
        setMovies(prev => prev.map(m => (m.id === movieId ? normalized : m)));
      })
      .catch(() => {
        // noop
      });
  };

  return (
    <MovieContext.Provider value={{ movies, people, searchMovies, searchPeople, addReview }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};