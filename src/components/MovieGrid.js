import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;