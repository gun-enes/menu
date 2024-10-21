import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar";
import DishList from "./pages/Dishes/DishList";



function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <div>
          <Routes>
            <Route path="/:category" element={<DishList />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
