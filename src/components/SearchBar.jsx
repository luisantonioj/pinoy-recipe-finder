import React from "react";

export default function SearchBar({ value, onChange, placeholder="Search recipes..." }){
  return (
    <div className="mb-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}