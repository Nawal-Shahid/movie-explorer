import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userFavorites = localStorage.getItem(`favorites_${user.uid}`);
      if (userFavorites) {
        setFavorites(JSON.parse(userFavorites));
      } else {
        setFavorites({});
      }
    } else {
      setFavorites({});
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addFavorite = (movie) => {
    if (user && movie.id && !favorites[movie.id]) {
      setFavorites(prev => ({ ...prev, [movie.id]: movie }));
    }
  };

  const removeFavorite = (id) => {
    if (user && id) {
      setFavorites(prev => {
        const newFavorites = { ...prev };
        delete newFavorites[id];
        return newFavorites;
      });
    }
  };

  const isFavorite = (id) => {
    return user ? !!favorites[id] : false;
  };

  const getFavoritesList = () => {
    return Object.values(favorites);
  };

  const value = {
    favorites: getFavoritesList(),
    addFavorite,
    removeFavorite,
    isFavorite,
    hasUser: !!user
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};