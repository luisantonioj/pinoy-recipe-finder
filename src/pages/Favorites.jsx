import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites(){
  const { favorites } = useFavorites();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Your Favorites</h2>
        <p className="text-sm text-gray-600">Recipes you've saved for later.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">You have no favorites yet. Add some from the recipes list.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
