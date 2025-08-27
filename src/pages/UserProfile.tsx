import React, { useState } from 'react';
import { User, Star, MessageCircle, Award, Calendar, Edit3, Save, X } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import MovieCard from '../components/MovieCard';
import { useUser } from '../context/UserContext';
import { useMovies } from '../context/MovieContext';

const UserProfile: React.FC = () => {
  const { user, updateProfile } = useUser();
  const { movies } = useMovies();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Please log in to view your profile</h1>
      </div>
    );
  }

  // Mock user data - in a real app, this would come from the backend
  const userReviews = [
    {
      id: '1',
      movieId: '1',
      userId: user.id,
      username: user.username,
      rating: 9,
      comment: "Absolutely incredible film! The cinematography and storytelling are phenomenal. Christopher Nolan has outdone himself once again.",
      date: '2024-01-15T00:00:00.000Z'
    },
    {
      id: '2',
      movieId: '2',
      userId: user.id,
      username: user.username,
      rating: 8,
      comment: "A masterpiece of filmmaking. The performances are outstanding and the story is deeply moving. Highly recommended!",
      date: '2024-01-10T00:00:00.000Z'
    }
  ];

  const favoriteMovies = movies.slice(0, 4);
  const watchlist = movies.slice(4, 8);

  const stats = [
    { icon: MessageCircle, label: 'Reviews', value: userReviews.length, color: 'text-cyan-400' },
    { icon: Star, label: 'Avg Rating', value: (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1), color: 'text-yellow-400' },
    { icon: Award, label: 'Badges', value: 3, color: 'text-purple-400' },
    { icon: Calendar, label: 'Member Since', value: '2024', color: 'text-green-400' }
  ];

  const handleSaveProfile = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Bio</label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:text-white hover:bg-white/20 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                <p className="text-gray-400 mb-2">{user.email}</p>
                <p className="text-gray-300">
                  {user.bio || "Movie enthusiast and avid reviewer. Love discovering new films and sharing my thoughts with the community!"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="text-center">
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Recent Reviews */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <MessageCircle className="w-6 h-6 mr-3" />
            Your Reviews
          </h2>
          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No reviews yet</h3>
              <p className="text-gray-500">Start watching movies and share your thoughts!</p>
            </div>
          )}
        </section>

        {/* Favorite Movies */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-400" />
            Favorite Movies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Watchlist */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-purple-400" />
            Watchlist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {watchlist.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;