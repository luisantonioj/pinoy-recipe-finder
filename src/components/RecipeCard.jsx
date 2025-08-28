import { Link } from "react-router-dom";
import { Heart, Clock, Users } from "lucide-react";
import { useFavorites } from '../contexts/FavoritesContext'; 
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const { id, name, image, description, cookTime, servings } = recipe;
  const [imageError, setImageError] = useState(false);
  
  // Use the favorites context
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleImageError = (e) => {
    e.currentTarget.style.display = "none";
    setImageError(true);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use context methods instead of local state
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <article className="card overflow-hidden group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/recipe/${id}`} className="block focus-ring rounded-2xl" onClick={() => window.scrollTo(0, 0)}>
        <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden relative">
          {!imageError ? (
            <img
              src={image}
              alt={name}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-4">
              <div className="w-12 h-12 mb-2 rounded-full bg-neutral-300 flex items-center justify-center">
                <span className="text-2xl">🍳</span>
              </div>
              <span className="text-neutral-500 text-sm text-center">No image available</span>
            </div>
          )}
          
          {/* Favorite button - now using context state */}
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200 focus-ring"
            aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite(id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
            />
          </button>
          
          {/* Recipe metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>{cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5" />
                <span>{servings} servings</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          {/* View Recipe Button
          <Link 
            to={`/recipe/${id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-accent/90 transition-colors duration-200 focus-ring"
            onClick={() => window.scrollTo(0, 0)}
          >
            View Recipe
          </Link> */}
        </div>
      </Link>
    </article>
  );
}