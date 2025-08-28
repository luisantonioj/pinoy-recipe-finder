import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Header(){
  const { favorites } = useFavorites();
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold">PR</div>
          <div>
            <h1 className="text-xl font-semibold" style={{color: "var(--color-text)"}}>Pinoy Recipe Finder</h1>
            <p className="text-sm text-gray-500">Classic Filipino recipes</p>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/" className={`px-3 py-2 rounded ${location.pathname === "/" ? "bg-primary text-white" : "text-gray-700"}`}>
            Home
          </Link>
          <Link to="/favorites" className={`px-3 py-2 rounded ${location.pathname === "/favorites" ? "bg-primary text-white" : "text-gray-700"}`}>
            Favorites <span className="ml-2 inline-block bg-accent text-white rounded-full px-2 text-xs">{favorites.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}