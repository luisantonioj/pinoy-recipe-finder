import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function RecipeCard({ recipe }) {
  const { id, name, image, description } = recipe;

  return (
    <article className="card overflow-hidden group relative rounded-2xl shadow-sm hover:shadow-md transition">
      <Link to={`/recipe/${id}`} className="block focus-ring">
        <div className="aspect-video bg-neutral-200 overflow-hidden">
          <img
            src={image}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
          {/* Fallback placeholder when image fails */}
          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
            <span className="sr-only">Image for {name}</span>
          </div>
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-110 transition">
            <Heart className="h-5 w-5 text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          {/* View Recipe Button */}
          <Link
            to={`/recipe/${id}`}
            className="mt-auto bg-red-500 text-white text-center py-2 rounded-lg hover:bg-red-600 transition"
          >
            View Recipe
          </Link>
        </div>
      </Link>
    </article>
  );
}
