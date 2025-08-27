import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="sr-only">
        Search recipes
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search by recipe name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default SearchBar;