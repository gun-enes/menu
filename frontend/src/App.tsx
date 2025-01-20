import { BrowserRouter as Router,Route,Routes, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DishList from "./pages/Dishes/DishList";
import Navbar from "./components/NavBar.tsx";



function App() {
  return (
    <>
      <Navbar title={"fdsjaflşdjsak"}/>
      <Router>
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
