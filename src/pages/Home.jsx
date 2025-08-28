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
    <div className="bg-neutralbg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Find a Recipe</h2>
        <p className="text-sm text-gray-600">Search classic Filipino recipes.</p>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}