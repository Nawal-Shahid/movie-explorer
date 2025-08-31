import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY }
});

// This is a helper function to get full image URL
export const getImageUrl = (path, size = "w500") => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
};