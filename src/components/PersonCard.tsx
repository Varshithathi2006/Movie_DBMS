import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award } from 'lucide-react';
import { Person } from '../types';

interface PersonCardProps {
  person: Person;
  className?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, className = '' }) => {
  return (
    <Link to={`/person/${person.id}`} className={`group ${className}`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
        <div className="relative overflow-hidden">
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
            {person.name}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Born {person.birthYear}</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {person.roles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30"
                >
                  {role}
                </span>
              ))}
            </div>
            
            {person.awards && person.awards.length > 0 && (
              <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                <Award className="w-4 h-4" />
                <span>{person.awards.length} award{person.awards.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PersonCard;