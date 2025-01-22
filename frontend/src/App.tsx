import { BrowserRouter as Router,Route,Routes, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DishList from "./pages/Dishes/DishList";
import Navbar from "./components/NavBar.tsx";




function App() {
  return (
    <>
      <Router>
          <Navbar/>
          <div>
          <Routes>
            <Route path="/:slug" element={<DishList />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
