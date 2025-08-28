import { useParams } from 'react-router-dom'
import recipes from '../data/recipes.json'
import { useFavorites } from '../contexts/FavoritesContext.jsx'

export default function RecipeDetail(){
  const { id } = useParams()
  const recipe = recipes.find(r => String(r.id) === String(id))
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(recipe?.id)

  if (!recipe) {
    return <div className="p-8 card">Recipe not found.</div>
  }

  const toggleFav = () => {
    if (fav) removeFavorite(recipe.id)
    else addFavorite(recipe.id)
  }

  return (
    <article className="card overflow-hidden">
      <div className="aspect-video bg-neutral-200">
        <img
          src={recipe.image}
          alt={recipe.name}
          onError={(e)=>{ e.currentTarget.style.display='none' }}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full flex items-center justify-center bg-neutral-200">
          <span className="sr-only">Image for {recipe.name}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{recipe.name}</h1>
          <button
            onClick={toggleFav}
            className={fav ? 'btn badge-danger' : 'btn-primary'}
            aria-pressed={fav}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {fav ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>

        <p className="mt-2 text-gray-700">{recipe.description}</p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc pl-6 space-y-1">
            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal pl-6 space-y-2">
            {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>
      </div>
    </article>
  )
}
