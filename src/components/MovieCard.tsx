import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, DollarSign } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  return (
    <Link to={`/movie/${movie.id}`} className={`group ${className}`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
        <div className="relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{Number(movie.rating).toFixed(1)}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors truncate">
            {movie.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{movie.releaseYear}</span>
              <span className="text-gray-500">•</span>
              <span>{movie.duration} min</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                >
                  {genre}
                </span>
              ))}
              {movie.genres.length > 2 && (
                <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-500/30">
                  +{movie.genres.length - 2}
                </span>
              )}
            </div>
            
            {movie.boxOffice && (
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <DollarSign className="w-4 h-4" />
                <span>{movie.boxOffice}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;