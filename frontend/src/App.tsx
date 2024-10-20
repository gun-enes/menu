import { BrowserRouter as Router,Route,Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import CategoryList from "./pages/Categories/CategoryList";
import DishList from "./pages/Dishes/DishList";



function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <div>
          <Routes>
            <Route path="/:type" element={<CategoryList />} />
            <Route path="/:type/:category" element={<DishList />} />
            <Route path="/contact" element={<HomePage />} />
            <Route path="/menu" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
