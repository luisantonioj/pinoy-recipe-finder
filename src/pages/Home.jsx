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

      <SearchBar value={query} onChange={setQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}