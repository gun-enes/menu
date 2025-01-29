import { BrowserRouter as Router,Route,Routes, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DishList from "./pages/Dishes/DishList";
import ArrangeList from "./pages/Arrange/ArrangeList.tsx";



function App() {
  return (
    <>
      <Router>
          <div>
          <Routes>
            <Route path="/edit-menu" element={<ArrangeList />} />
            <Route path="/:slug" element={<DishList />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
