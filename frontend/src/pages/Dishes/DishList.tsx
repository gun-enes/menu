import { useState, useEffect } from "react";
import AddButton from "./AddDish";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import { DishContext } from "./DishContext";
import {addDish, getDishes} from "../../api/Dishes.tsx";
import Navbar from "../../components/NavBar.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import AddCategoryModal from "../../components/AddCategoryModal.tsx";

function DishList() {
  const {category} = useParams();
  const [data, setData] = useState<Dish[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toggleButton, setToggleButton] = useState<boolean>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setURL] = useState("");
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState<boolean>(false);
  const [dishId, setDishId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishes = await getDishes(); // Fetch data from the API
        setData(dishes);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (title: string, content: string, price: number, url: string, category:string) => {
    const newDish: Dish = {
      title,
      content,
      price,
      url,
      category,
    };
    const updatedData = await addDish(newDish, data); // Pass data to the API function
    setData(updatedData);
    setTitle("");
    setContent("");
    setURL("");
    setPrice(0);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <>
        <Navbar title={category?.toUpperCase()}/>
        <nav style={{
          background: 'linear-gradient(90deg, #f1356d, #e91e63)', // Gradient background
          padding: '0px 0px 30px 0px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex gap-3">
                  <CustomButton text={"Ekle"} buttonBehaviour={() => setIsModalOpen(!isModalOpen)}/>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <AddCategoryModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleSubmit}/>
        <DishContext.Provider value={{
          dishId,
          setDishId,
          setTitle,
          setURL,
          setEdit,
          setData,
          setError,
          setPrice,
          setContent,
          url,
          edit,
          data,
          price,
          content,
          title
        }}>
          {toggleButton ? <AddButton/> : null}
          <DishDatacard arrange={toggleButton}
          />
        </DishContext.Provider>
      </>
  );
}

export default DishList;
