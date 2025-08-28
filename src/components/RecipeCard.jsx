import { Link } from 'react-router-dom'

export default function RecipeCard({ recipe }){
  const { id, name, image, description } = recipe

  return (
    <article className="card overflow-hidden group">
      <Link to={`/recipe/${id}`} className="block focus-ring">
        <div className="aspect-video bg-neutral-200 overflow-hidden">
          <img
            src={image}
            alt={name}
            onError={(e)=>{ e.currentTarget.style.display='none' }}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
          {/* Fallback placeholder when image fails */}
          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
            <span className="sr-only">Image for {name}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </Link>
    </article>
  )
}
