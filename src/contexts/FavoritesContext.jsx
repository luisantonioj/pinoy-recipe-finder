import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }){
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const value = useMemo(() => ({
    favorites,
    isFavorite: (id) => favorites.includes(id),
    addFavorite: (id) => setFavorites((prev) => prev.includes(id) ? prev : [...prev, id]),
    removeFavorite: (id) => setFavorites((prev) => prev.filter(x => x !== id)),
    toggleFavorite: (id) => {
      setFavorites((prev) => 
        prev.includes(id) 
          ? prev.filter(x => x !== id) 
          : [...prev, id]
      )
    }
  }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(){
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}