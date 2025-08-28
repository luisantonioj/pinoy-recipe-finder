import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Favorites from './pages/Favorites.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'

export default function App(){
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-neutralBg">
        <Header />
        <main className="max-w-6xl mx-auto p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<div className="p-8">Page not found.</div>} />
          </Routes>
        </main>
      </div>
    </FavoritesProvider>
  )
}
