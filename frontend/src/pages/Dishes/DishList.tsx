import { useState, useEffect } from "react";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import { DishContext } from "./DishContext";
import {addDish, getDishesByCategory} from "../../api/Dishes.tsx";
import Navbar from "../../components/NavBar.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import AddDishModal from "../../components/AddDishModal.tsx";
import {getCategoryById} from "../../api/Categories.tsx";



function DishList() {
  const {category} = useParams();
  const [data, setData] = useState<Dish[]>();
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setURL] = useState("");
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState<boolean>(false);
  const [dishId, setDishId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
          console.log(category);
          const dishes = await getDishesByCategory(category); // Fetch data from the API
          const cat = await getCategoryById(category);
          setCategoryName(cat.title);
          setData(dishes);
          setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleSubmit = async (title: string, url: string, price: number, content: string, category:string) => {
    const newDish: Dish = {
      title,
      content,
      price,
      url,
      category,
    };
    const updatedData = await addDish(newDish, data); // Pass data to the API function
    setData(updatedData);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <>
        <Navbar title={categoryName.toUpperCase()}/>
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
        {
          category ?         <AddDishModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleSubmit} category={category}/>
                : null
        }
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
          <DishDatacard
          />
        </DishContext.Provider>
      </>
  );
}

export default DishList;
