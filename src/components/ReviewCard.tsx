import React from 'react';
import { Star, User, Calendar } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-white font-semibold">{review.username}</h4>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(review.date)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 bg-yellow-400/20 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-yellow-400 font-semibold">{review.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-300 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;