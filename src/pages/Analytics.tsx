import React, { useState } from 'react';
import { TrendingUp, Award, DollarSign, Star, Calendar, Users, BarChart3, PieChart } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { useMovies } from '../context/MovieContext';

const Analytics: React.FC = () => {
  const { movies } = useMovies();
  const [activeTab, setActiveTab] = useState<'overview' | 'ratings' | 'boxoffice' | 'genres'>('overview');

  const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const highestGrossingMovies = [...movies]
    .filter(movie => movie.boxOffice)
    .sort((a, b) => {
      const aAmount = parseFloat(a.boxOffice!.replace(/[$,BM]/g, ''));
      const bAmount = parseFloat(b.boxOffice!.replace(/[$,BM]/g, ''));
      const aMultiplier = a.boxOffice!.includes('B') ? 1000 : 1;
      const bMultiplier = b.boxOffice!.includes('B') ? 1000 : 1;
      return (bAmount * bMultiplier) - (aAmount * aMultiplier);
    })
    .slice(0, 5);

  const recentMovies = [...movies].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, 5);

  // Genre analytics
  const genreStats = movies.reduce((acc: { [key: string]: number }, movie) => {
    movie.genres.forEach(genre => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {});

  const topGenres = Object.entries(genreStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  // Year analytics
  const yearStats = movies.reduce((acc: { [key: string]: number }, movie) => {
    const decade = Math.floor(movie.releaseYear / 10) * 10;
    const decadeLabel = `${decade}s`;
    acc[decadeLabel] = (acc[decadeLabel] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { icon: TrendingUp, label: 'Total Movies', value: movies.length.toLocaleString(), color: 'text-cyan-400' },
    { icon: Star, label: 'Average Rating', value: (movies.reduce((sum, m) => sum + Number(m.rating || 0), 0) / Math.max(movies.length, 1)).toFixed(1), color: 'text-yellow-400' },
    { icon: DollarSign, label: 'Total Box Office', value: '$45.2B', color: 'text-green-400' },
    { icon: Calendar, label: 'Span', value: '2010-2025', color: 'text-purple-400' }
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'ratings', label: 'Top Rated', icon: Star },
    { key: 'boxoffice', label: 'Box Office', icon: DollarSign },
    { key: 'genres', label: 'Genres', icon: PieChart }
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Bingibo{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Analytics
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Dive deep into movie trends, ratings, and box office performance with comprehensive data insights.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all">
            <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
            <div className="text-2xl font-bold text-white text-center">{value}</div>
            <div className="text-gray-400 text-sm text-center">{label}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
              activeTab === key
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Recent Movies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                Recent Releases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {recentMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            {/* Genre Distribution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <PieChart className="w-6 h-6 mr-3" />
                Popular Genres
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {topGenres.map(([genre, count]) => (
                  <div key={genre} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-white">{count}</div>
                    <div className="text-gray-400 text-sm">{genre}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Decade Distribution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3" />
                Movies by Decade
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(yearStats)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([decade, count]) => (
                  <div key={decade} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-white">{count}</div>
                    <div className="text-gray-400 text-sm">{decade}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ratings' && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-yellow-400" />
              Highest Rated Movies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {topRatedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'boxoffice' && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-3 text-green-400" />
              Highest Grossing Movies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {highestGrossingMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'genres' && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-3 text-purple-400" />
              Genre Analysis
            </h2>
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {topGenres.map(([genre, count], index) => {
                  const percentage = ((count / movies.length) * 100).toFixed(1);
                  return (
                    <div key={genre} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:border-purple-400/30 transition-all">
                      <div className="text-3xl font-bold text-white mb-2">{count}</div>
                      <div className="text-purple-400 font-semibold mb-1">{genre}</div>
                      <div className="text-gray-400 text-sm">{percentage}% of library</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Analytics;