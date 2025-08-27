import React from "react";
import recipes from "./data/recipes.json";

function App() {
  console.log(recipes); // check in console

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pinoy Recipe Finder</h1>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{recipe.name}</h2>
            <p className="text-gray-600 text-sm">{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
