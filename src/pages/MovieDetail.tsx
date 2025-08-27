import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, DollarSign, Award, Users, MessageCircle, ChevronLeft } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import { useMovies } from '../context/MovieContext';
import { useUser } from '../context/UserContext';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies, addReview } = useMovies();
  const { user } = useUser();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const movie = movies.find(m => m.id === id);
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Movie Not Found</h1>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Homepage
        </Link>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReview.comment.trim()) return;

    addReview(movie.id, {
      id: Date.now().toString(),
      movieId: movie.id,
      userId: user.id,
      username: user.username,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString()
    });

    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Movies</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${movie.poster})` }}
          ></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Movie Poster */}
            <div className="lg:w-1/3">
              <div className="relative group">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-2xl border border-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-semibold text-yellow-400">{Number(movie.rating).toFixed(1)}</span>
                    <span className="text-gray-400">({movie.reviews?.length || 0} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{movie.releaseYear}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration} min</span>
                  </div>
                  
                  {movie.boxOffice && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5" />
                      <span>{movie.boxOffice}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full border border-purple-500/50 text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.synopsis || "A captivating cinematic experience that showcases exceptional storytelling, brilliant performances, and stunning visuals. This film takes audiences on an unforgettable journey through compelling characters and masterful direction."}
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Cast
                  </h3>
                  <div className="space-y-2">
                    {movie.cast?.slice(0, 5).map((actor, index) => (
                      <Link
                        key={index}
                        to={`/person/${actor.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-gray-300 hover:text-cyan-400 transition-colors"
                      >
                        {actor}
                      </Link>
                    )) || ['Leonardo DiCaprio', 'Emma Stone', 'Ryan Gosling', 'Margot Robbie'].map((actor, index) => (
                      <div key={index} className="text-gray-300">{actor}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Crew
                  </h3>
                  <div className="space-y-2">
                    {movie.crew?.slice(0, 5).map((member, index) => (
                      <div key={index} className="text-gray-300">{member}</div>
                    )) || [
                      'Christopher Nolan - Director',
                      'Hans Zimmer - Composer',
                      'Roger Deakins - Cinematographer',
                      'Lee Smith - Editor'
                    ].map((member, index) => (
                      <div key={index} className="text-gray-300">{member}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <MessageCircle className="w-7 h-7 mr-3" />
            Reviews ({movie.reviews?.length || 0})
          </h2>
          
          {user && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all"
            >
              Write Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && user && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 mb-8">
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        newReview.rating >= rating
                          ? 'bg-yellow-400 border-yellow-400 text-black'
                          : 'border-gray-600 text-gray-400 hover:border-yellow-400'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this movie..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {movie.reviews?.length ? (
            movie.reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No reviews yet</h3>
              <p className="text-gray-500">Be the first to share your thoughts about this movie!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;