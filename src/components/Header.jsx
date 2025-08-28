import { NavLink, Link } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import usePWA from '../hooks/usePWA.js'

export default function Header(){
  const { favorites } = useFavorites()
  const { canInstall, promptInstall } = usePWA()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3 sm:p-4">
        <Link to="/" className="flex items-center gap-2 focus-ring" aria-label="Go to homepage">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white font-bold">PR</span>
          <span className="font-bold text-lg sm:text-xl">Pinoy Recipe Finder</span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4" aria-label="Primary">
          <NavLink to="/" className="link" end>Home</NavLink>
          <NavLink to="/favorites" className="link">
            Favorites
            <span className="ml-2 badge bg-primary text-white" aria-live="polite" aria-atomic="true">{favorites.length}</span>
          </NavLink>
          {canInstall && (
            <button onClick={promptInstall} className="btn-accent" aria-label="Install this app">Install</button>
          )}
        </nav>
      </div>
    </header>
  )
}
