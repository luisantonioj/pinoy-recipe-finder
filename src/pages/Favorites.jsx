import recipes from '../data/recipes.json'
import RecipeCard from '../components/RecipeCard.jsx'
import { useFavorites } from '../contexts/FavoritesContext.jsx'

export default function Favorites(){
  const { favorites } = useFavorites()
  const favRecipes = recipes.filter(r => favorites.includes(r.id))

  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Your Favorites</h1>
      {favRecipes.length === 0 ? (
        <div className="card p-6">No favorites yet. Add some tasty picks!</div>
      ) : (
        <div className="grid-recipes">{favRecipes.map(r => <RecipeCard key={r.id} recipe={r} />)}</div>
      )}
    </section>
  )
}
