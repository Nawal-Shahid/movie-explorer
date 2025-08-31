import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tmdb } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const response = await tmdb.get("/search/movie", {
          params: { query }
        });
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to search movies");
        console.error("Error searching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-blue-400 text-xl">Searching...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default SearchResults;