import React, { useEffect, useMemo, useState } from "react";
import recipesData from "../data/recipes.json";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

export default function Home(){
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // assume recipesData is local json import
    setRecipes(recipesData);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return recipes;
    const q = query.toLowerCase();
    return recipes.filter(r => r.name.toLowerCase().includes(q));
  }, [recipes, query]);

  return (
    <div className="bg-neutralBg min-h-screen px-4 py-8">
      <div className="mb-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-2">Find a Recipe</h1>
        <p className="text-sm text-gray-600">Search classic Filipino recipes.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid-recipes max-w-6xl mx-auto">
        {filtered.length > 0 ? (
          filtered.map((r) => <RecipeCard key={r.id} recipe={r} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
}