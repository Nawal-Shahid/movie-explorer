import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../api/tmdb';
import BookmarkButton from './BookmarkButton';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path) || 'https://via.placeholder.com/500x750/333/fff?text=No+Image'}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={handleClick}
        />
        <BookmarkButton movie={movie} />
        
        {/* Quick info overlay on hover */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={handleClick}
        >
          <div className="text-center p-4">
            <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
            <p className="text-gray-300 text-sm">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </p>
            <p className="text-yellow-400 text-sm mt-1">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </p>
            <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 
          className="font-bold text-lg mb-1 truncate hover:text-blue-400 transition-colors cursor-pointer"
          onClick={handleClick}
          title={movie.title}
        >
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 mr-1">⭐</span>
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;