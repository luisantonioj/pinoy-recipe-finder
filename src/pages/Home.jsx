import { useEffect, useMemo, useRef, useState } from 'react'
import RecipeCard from '../components/RecipeCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import recipesData from '../data/recipes.json'

export default function Home(){
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState(recipesData)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // Save & restore scroll position
  useEffect(() => {
    const saved = sessionStorage.getItem("homeScroll")
    if (saved) {
      window.scrollTo(0, parseInt(saved))
    }

    return () => {
      sessionStorage.setItem("homeScroll", window.scrollY)
    }
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return recipes
    return recipes.filter(r => 
      r.name.toLowerCase().includes(term) || 
      (r.tags && r.tags.some(tag => tag.toLowerCase().includes(term))) ||
      (r.ingredients && r.ingredients.some(ingredient => ingredient.toLowerCase().includes(term)))
    )
  }, [search, recipes])

  return (
    <section className="pb-8">
      {/* Hero Section with dynamic gradient */}
      <div 
        ref={heroRef}
        className="relative mb-8 rounded-2xl overflow-hidden p-6 md:p-8 transition-all duration-200"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(255, 152, 0, 0.15), 
            rgba(76, 175, 80, 0.15),
            rgba(255, 152, 0, 0.05))`
        }}
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Discover Authentic Filipino Recipes
          </h1>
          <p className="text-gray-600 mb-6">
            From classic adobo to regional specialties, find the perfect Filipino dish to cook and share with your loved ones.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">Explore Filipino Classics</h2>
        <div className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? 'recipe' : 'recipes'} found
        </div>
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Results Section */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No recipes found</h3>
          <p className="text-gray-500 mb-4">Try different keywords or browse popular categories</p>
          <button 
            onClick={() => setSearch('')}
            className="btn-accent"
          >
            View All Recipes
          </button>
        </div>
      ) : (
        <>
          <div className="grid-recipes">
            {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </>
      )}
    </section>
  )
}