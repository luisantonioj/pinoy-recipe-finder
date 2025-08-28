import { useEffect, useMemo, useState } from 'react'
import RecipeCard from '../components/RecipeCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import recipesData from '../data/recipes.json'

export default function Home(){
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])

  // Simulate fetch (could be replaced with axios if moved to /public)
  useEffect(() => {
    setRecipes(recipesData)
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return recipes
    return recipes.filter(r => r.name.toLowerCase().includes(term))
  }, [search, recipes])

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Explore Filipino Classics</h2>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {filtered.length === 0 ? (
        <p role="status" className="p-6 card">No recipes found. Try another search.</p>
      ) : (
        <div className="grid-recipes">{filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}</div>
      )}
    </section>
  )
}
