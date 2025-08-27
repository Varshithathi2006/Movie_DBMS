import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import PersonCard from '../components/PersonCard';
import FilterPanel from '../components/FilterPanel';
import { useMovies } from '../context/MovieContext';
import { Movie, Person } from '../types';

const Homepage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { movies, people, searchMovies, searchPeople } = useMovies();
  
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'movies' | 'people'>('movies');
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    boxOffice: ''
  });

  useEffect(() => {
    if (searchQuery) {
      setFilteredMovies(searchMovies(searchQuery));
      setFilteredPeople(searchPeople(searchQuery));
    } else {
      applyFilters();
    }
  }, [searchQuery, movies, people, filters]);

  const applyFilters = () => {
    let filtered = [...movies];

    if (filters.genre) {
      filtered = filtered.filter(movie => movie.genres.includes(filters.genre));
    }
    
    if (filters.year) {
      filtered = filtered.filter(movie => movie.releaseYear.toString() === filters.year);
    }
    
    if (filters.rating) {
      filtered = filtered.filter(movie => movie.rating >= parseFloat(filters.rating));
    }
    
    if (filters.boxOffice) {
      const minAmount = parseFloat(filters.boxOffice) * 1000000;
      filtered = filtered.filter(movie => {
        if (!movie.boxOffice) return false;
        const amount = parseFloat(movie.boxOffice.replace(/[$,BM]/g, ''));
        const multiplier = movie.boxOffice.includes('B') ? 1000000000 : 1000000;
        return (amount * multiplier) >= minAmount;
      });
    }

    setFilteredMovies(filtered);
    setFilteredPeople(people);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ genre: '', year: '', rating: '', boxOffice: '' });
  };

  const featuredMovies = movies.slice(0, 8);
  const topPeople = people.slice(0, 6);

  const stats = [
    { icon: TrendingUp, label: 'Movies', value: '10,000+' },
    { icon: Users, label: 'People', value: '5,000+' },
    { icon: Award, label: 'Awards', value: '1,200+' },
    { icon: Clock, label: 'Hours Watched', value: '2.5M+' }
  ];

  if (searchQuery) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-gray-400">
            Found {filteredMovies.length} movies and {filteredPeople.length} people
          </p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'movies'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            Movies ({filteredMovies.length})
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'people'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'bg-white/10 text-gray-300 hover:text-white'
            }`}
          >
            People ({filteredPeople.length})
          </button>
        </div>

        {activeTab === 'movies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {activeTab === 'people' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPeople.map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="relative container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Bingibo
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your intelligent movie database. Discover, explore, and dive deep into the world of cinema with AI-powered insights.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
          <FilterPanel
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.slice(0, 8).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Top People Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Top Directors & Actors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {topPeople.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-12 border border-cyan-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to explore Bingibo?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community to write reviews, rate movies, and get personalized recommendations from our AI assistant.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all hover:scale-105">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;