import React from "react";

function RecipeCard({ recipe }) {
  return (
    <article className="bg-white rounded-lg shadow p-4">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-40 w-full object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold">{recipe.name}</h2>
      <p className="text-gray-600 text-sm">{recipe.description}</p>
    </article>
  );
}

export default RecipeCard;
