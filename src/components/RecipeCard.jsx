import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }){
  return (
    <Link to={`/recipe/${recipe.id}`} className="block bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg" style={{color:"var(--color-text)"}}>{recipe.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
      </div>
    </Link>
  );
}