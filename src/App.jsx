import React, { useState } from "react";
import recipes from "./data/recipes.json";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter recipes by search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pinoy Recipe Finder</h1>

      {/* Search bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Recipe grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>

      {/* No results message */}
      {filteredRecipes.length === 0 && (
        <p className="mt-6 text-gray-500">No recipes found.</p>
      )}
    </div>
  );
}

export default App;