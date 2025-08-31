import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import MovieGrid from "../components/MovieGrid";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Please log in to view your favorites</p>
          <Link
            to="/login"
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">You haven't added any favorites yet</p>
          <p className="text-gray-400 mt-2">Browse movies and click the heart icon to save them</p>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;