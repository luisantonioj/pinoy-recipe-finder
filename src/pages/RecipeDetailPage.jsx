import React from "react";
import { useParams, Link } from "react-router-dom";
import recipes from "../data/recipes.json";

function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-primary underline mb-4 block">
        ← Back to recipes
      </Link>

      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
      <p className="text-gray-700 mb-6">{recipe.description}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-6">
        {recipe.ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2">
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetailPage;