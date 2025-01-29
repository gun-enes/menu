import { useState } from "react";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton.tsx";
import AddDishModal from "../../components/modals/AddDishModal.tsx";
import LoadingPage from "../../components/LoadingPage.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";
import {useAppContext} from "../AppProvider.tsx";
import Navbar from "../../components/navbar/NavBar.tsx";
import DishFetch from "../../hooks/DishFetch.tsx";
import UpdateDishModal from "../../components/modals/UpdateDishModal.tsx";
import ConfirmationModal from "../../components/modals/DeleteModal.tsx";


function DishList() {
  const {slug} = useParams();
  const {dishes, loading, error, addDish, updateDish, deleteDish} = DishFetch(slug);
  const {arrange} = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<Dish>({
    title: "",
    content: "",
    price: 0,
    url: "",
    category: "",
  });


  return (
      <>
        <Navbar/>
        {arrange ?
        <nav style={{
          background: 'linear-gradient(90deg, #f1356d, #e91e63)', // Gradient background
          padding: '0px 0px 30px 0px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex gap-3">
                  <CustomButton text={"Ekle"} buttonBehaviour={() => setIsAddModalOpen(!isAddModalOpen)}/>
                </div>
              </div>
            </div>
          </div>
        </nav>: null}
        {loading ? <LoadingPage/> : error ? <ErrorPage errorMessage={error}/> :
            <div
                className="container"
                style={{
                  backgroundColor: "#f8f4ef",
                  padding: "30px",
                }}

            >
              <AddDishModal
                  open={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onAddItem={(newDish: Dish) => {
                      addDish(newDish);
                    }
                  }
                  category={dishes.length > 0 ? dishes[0].category : slug ? slug : ""}/>
              <UpdateDishModal
                  open={isUpdateModalOpen}
                  onClose={() => setIsUpdateModalOpen(false)}
                  onUpdateItem={(updatedDish: Dish) => {
                    selectedDish._id && updateDish(selectedDish._id, updatedDish);
                    setIsUpdateModalOpen(false);
                  }}
                  dish={selectedDish}
                  setDish={setSelectedDish}
              />
              <ConfirmationModal
                  open={isConfirmationModalOpen}
                  onClose={() => setIsConfirmationModalOpen(false)}
                  onConfirm={() => {
                    selectedDish._id && deleteDish(selectedDish._id);
                    setIsConfirmationModalOpen(false);
                  }}/>

              <div className="row g-3">
                {dishes &&
                    dishes.map((dish) => (

                        <DishDatacard
                            dish={dish}
                            onDelete={() => {
                              setSelectedDish(dish);
                              setIsConfirmationModalOpen(true);
                            }}
                            onEdit={() => {
                              setSelectedDish(dish);
                              setIsUpdateModalOpen(true);
                            }}
                            arrange={arrange}
                        />
                    ))}
              </div>
            </div>
        }
      </>
  );
}

export default DishList;
