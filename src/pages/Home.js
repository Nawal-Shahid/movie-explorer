import React, { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const response = await tmdb.get("/trending/movie/week");
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch trending movies");
        console.error("Error fetching trending movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-64">
        <div className="text-blue-400 text-xl">Loading trending movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Trending Movies This Week</h1>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default Home;