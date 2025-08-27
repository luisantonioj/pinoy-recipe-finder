import React, { useState } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pinoy Recipe Finder</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <RecipeCard recipe={recipe} />
            </Link>
          </li>
        ))}
      </ul>

      {filteredRecipes.length === 0 && (
        <p className="mt-6 text-gray-500">No recipes found.</p>
      )}
    </div>
  );
}

export default HomePage;