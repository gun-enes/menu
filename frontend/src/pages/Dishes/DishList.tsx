import { useState, useEffect } from "react";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import { DishContext } from "./DishContext";
import {addDish, getDishesByCategory} from "../../api/Dishes.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import AddDishModal from "../../components/modals/AddDishModal.tsx";
import LoadingPage from "../../components/LoadingPage.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";



function DishList() {
  const {category} = useParams();
  const [data, setData] = useState<Dish[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
          console.log(category);
          const dishes = await getDishesByCategory(category); // Fetch data from the API
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


  return (
      <>
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
        {loading ? <LoadingPage/> : error ? <ErrorPage errorMessage={error}/> :
          <div>
            {
              category ?         <AddDishModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleSubmit} category={category}/>
                  : null
            }
            <DishContext.Provider value={{
              setData,
              setError,
              data,
            }}>
              <DishDatacard
              />
            </DishContext.Provider>
          </div>
        }
      </>
  );
}

export default DishList;
