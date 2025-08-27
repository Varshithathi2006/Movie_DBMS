import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Award, Film, Star, ChevronLeft } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { useMovies } from '../context/MovieContext';

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { people, movies } = useMovies();
  
  const person = people.find(p => p.id === id);
  
  if (!person) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Person Not Found</h1>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Homepage
        </Link>
      </div>
    );
  }

  // Mock filmography - in a real app, this would be fetched based on person's involvement
  const filmography = movies.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${person.photo})` }}
          ></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Person Photo */}
            <div className="lg:w-1/3">
              <div className="relative group">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-2xl border border-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </div>

            {/* Person Info */}
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {person.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Born {person.birthYear}</span>
                  </div>
                  
                  {person.awards && person.awards.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <span>{person.awards.length} Award{person.awards.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {person.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-cyan-500/30 text-cyan-200 rounded-full border border-cyan-500/50 text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Biography</h3>
                <p className="text-gray-300 leading-relaxed">
                  {person.bio || `${person.name} is a renowned ${person.roles.join(' and ').toLowerCase()} known for exceptional contributions to cinema. With a career spanning decades, they have captivated audiences worldwide with memorable performances and groundbreaking work in the film industry.`}
                </p>
              </div>

              {/* Awards */}
              {person.awards && person.awards.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-400" />
                    Awards & Recognition
                  </h3>
                  <div className="grid gap-3">
                    {person.awards.map((award, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Award className="w-6 h-6 text-yellow-400" />
                          <div>
                            <div className="text-white font-semibold">{award.name}</div>
                            <div className="text-gray-400 text-sm">{award.year} • {award.category}</div>
                          </div>
                        </div>
                      </div>
                    )) || [
                      { name: 'Academy Award', year: 2023, category: 'Best Actor' },
                      { name: 'Golden Globe', year: 2022, category: 'Best Performance' },
                      { name: 'Screen Actors Guild Award', year: 2021, category: 'Outstanding Performance' }
                    ].map((award, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Award className="w-6 h-6 text-yellow-400" />
                          <div>
                            <div className="text-white font-semibold">{award.name}</div>
                            <div className="text-gray-400 text-sm">{award.year} • {award.category}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filmography Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Film className="w-7 h-7 mr-3" />
          Filmography
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filmography.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PersonDetail;