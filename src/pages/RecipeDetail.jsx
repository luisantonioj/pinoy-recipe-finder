import { useParams } from 'react-router-dom'
import recipes from '../data/recipes.json'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import { Heart, Clock, Users, ArrowLeft, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecipeDetail(){
  const { id } = useParams()
  const recipe = recipes.find(r => String(r.id) === String(id))
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(recipe?.id)
  const [imageError, setImageError] = useState(false)

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
          <Link to="/" className="btn btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </Link>
        </div>
      </div>
    )
  }

  const toggleFav = () => {
    if (fav) removeFavorite(recipe.id)
    else addFavorite(recipe.id)
  }

  const handleImageError = (e) => {
    e.currentTarget.style.display = 'none'
    setImageError(true)
  }

  const shareRecipe = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text: recipe.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err))
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Recipes
      </Link>

      <article className="card overflow-hidden rounded-2xl shadow-sm border border-gray-100">
        {/* Recipe image with overlay */}
        <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200">
          {!imageError ? (
            <img
              src={recipe.image}
              alt={recipe.name}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-4">
              <div className="w-16 h-16 mb-4 rounded-full bg-neutral-300 flex items-center justify-center">
                <span className="text-4xl">🍳</span>
              </div>
              <span className="text-neutral-500">No image available</span>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFav}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform focus-ring"
              aria-pressed={fav}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-5 w-5 ${fav ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          </div>

          {/* Recipe metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
            <p className="text-lg mb-4">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Ingredients section */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-2 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-2 w-2 mt-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{ing}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructions section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-2 bg-accent rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
            </div>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Print/Share buttons at bottom
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
            <button
              onClick={() => window.print()}
              className="btn btn-ghost"
            >
              Print Recipe
            </button>
            <button
              onClick={shareRecipe}
              className="btn btn-primary"
            >
              Share Recipe
            </button>
          </div> */}
        </div>
      </article>
    </div>
  )
}