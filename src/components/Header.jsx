import { NavLink, Link } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import usePWA from '../hooks/usePWA.js'
import { Heart, Home, Download } from 'lucide-react'

export default function Header(){
  const { favorites } = useFavorites()
  const { canInstall, promptInstall } = usePWA()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 sm:p-5">
        <Link 
          to="/" 
          className="flex items-center gap-3 focus-ring rounded-xl p-1 transition-all hover:scale-105"
          aria-label="Go to homepage"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg shadow-md">
            🍲
          </span>
          <div className="hidden sm:block">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pinoy Recipe Finder
            </span>
            <p className="text-xs text-gray-500 -mt-1">Authentic Filipino Cuisine</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Primary">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`
            }
            end
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-medium relative ${
                isActive 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`
            }
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-sm"
                aria-live="polite" 
                aria-atomic="true"
              >
                {favorites.length}
              </span>
            )}
          </NavLink>
          
          {canInstall && (
            <button 
              onClick={promptInstall} 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-orange-500 text-white font-medium hover:shadow-md transition-all focus-ring"
              aria-label="Install this app"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Install</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}