import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import recipesData from "../data/recipes.json";
import { useFavorites } from "../contexts/FavoritesContext";

export default function RecipeDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const found = recipesData.find(r => String(r.id) === String(id));
    if (!found) {
      // recipe not found, redirect to home
      navigate("/");
    } else setRecipe(found);
  }, [id, navigate]);

  if (!recipe) return null;

  const fav = isFavorite(recipe.id);

  return (
    <div className="bg-white rounded p-6 shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img src={recipe.image} alt={recipe.name} className="w-full rounded object-cover h-64"/>
        </div>

        <div className="md:flex-1">
          <h2 className="text-2xl font-semibold" style={{color:"var(--color-text)"}}>{recipe.name}</h2>
          <p className="text-gray-600 mt-2">{recipe.description}</p>

          <div className="mt-4">
            <button
              onClick={() => fav ? removeFavorite(recipe.id) : addFavorite(recipe)}
              className={`px-4 py-2 rounded ${fav ? "bg-danger text-white" : "bg-primary text-white"}`}
            >
              {fav ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Ingredients</h3>
            <ul className="list-disc pl-5 mt-2">
              {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Instructions</h3>
            <ol className="list-decimal pl-5 mt-2">
              {recipe.instructions.map((ins, idx) => <li key={idx} className="mb-2">{ins}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}