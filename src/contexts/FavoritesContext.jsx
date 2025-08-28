import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("pinoy_favorites_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("pinoy_favorites_v1", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe) => {
    setFavorites((prev) => {
      if (prev.find(r => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter(r => r.id !== id));
  };

  const isFavorite = (id) => favorites.some(r => r.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
