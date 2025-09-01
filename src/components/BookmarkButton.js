import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const favorite = isFavorite(movie.id);

  const handleClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <button
      className={`bookmark-btn absolute top-2 right-2 bg-gray-900 bg-opacity-70 rounded-full p-2 ${favorite ? 'text-red-500' : 'text-white'}`}
      onClick={handleClick}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      title={!user ? 'Login to bookmark' : favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite ? '❤️' : '🤍'}
    </button>
  );
};

export default BookmarkButton;