import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { tmdb, getImageUrl } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await tmdb.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBookmarkClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          {error || "Movie not found"}
          <div className="mt-4">
            <Link 
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(movie.id);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <div className="relative h-96 w-full">
          <img
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative -mt-48 z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="lg:w-1/3">
            <img
              src={getImageUrl(movie.poster_path, "w500") || 'https://via.placeholder.com/500x750/333/fff?text=No+Image'}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Details */}
          <div className="lg:w-2/3">
            <Link
              to=".."
              className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>

            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex items-center text-yellow-400">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average?.toFixed(1)}/10
              </span>
              <span className="text-gray-400">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleBookmarkClick}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  isFav 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                title={user ? (isFav ? 'Remove from favorites' : 'Add to favorites') : 'Login to bookmark'}
              >
                {isFav ? '❤️ Remove' : '🤍 Save'}
              </button>
              {!user && (
                <Link 
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Login to save favorites
                </Link>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                    <span
                    key={genre.id}
                    className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm cursor-default"
                    >
                    {genre.name}
                    </span>
                ))}
                </div>
            </div>
            )}

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Production Companies</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="flex items-center">
                      {company.logo_path ? (
                        <img
                          src={getImageUrl(company.logo_path, "w200")}
                          alt={company.name}
                          className="h-8 object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;