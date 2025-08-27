import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    genre: string;
    year: string;
    rating: string;
    boxOffice: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onToggle,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-full text-white hover:border-cyan-400 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-80 bg-black/80 backdrop-blur-md rounded-xl border border-cyan-500/30 p-6 z-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">Filters</h3>
            <button
              onClick={onClearFilters}
              className="text-gray-400 hover:text-red-400 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => onFilterChange('genre', e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => onFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => onFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">Any Rating</option>
                <option value="9">9.0+</option>
                <option value="8">8.0+</option>
                <option value="7">7.0+</option>
                <option value="6">6.0+</option>
                <option value="5">5.0+</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Box Office</label>
              <select
                value={filters.boxOffice}
                onChange={(e) => onFilterChange('boxOffice', e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">Any Amount</option>
                <option value="1000">$1B+</option>
                <option value="500">$500M+</option>
                <option value="100">$100M+</option>
                <option value="50">$50M+</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;