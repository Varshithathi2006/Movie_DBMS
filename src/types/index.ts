export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  duration: number;
  genres: string[];
  rating: number;
  poster: string;
  synopsis?: string;
  cast?: string[];
  crew?: string[];
  boxOffice?: string;
  reviews?: Review[];
}

export interface Person {
  id: string;
  name: string;
  birthYear: number;
  photo: string;
  bio?: string;
  roles: string[];
  awards?: Award[];
}

export interface Award {
  name: string;
  year: number;
  category: string;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}