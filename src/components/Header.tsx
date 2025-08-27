import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, Film, TrendingUp, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Film className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Bingibo
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, actors, directors..."
                className="w-full px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/analytics" className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20">
            <form onSubmit={handleSearch} className="mt-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, actors, directors..."
                  className="w-full px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/analytics" 
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>{user.username}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;