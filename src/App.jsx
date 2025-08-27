import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;