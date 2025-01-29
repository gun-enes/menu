import { useState } from "react";
import { Category } from "./Category";
import GridDatacard from "./GridDatacard.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import AddCategoryModal from "../../components/modals/AddCategoryModal.tsx";
import LoadingPage from "../../components/LoadingPage.tsx";
import ErrorPage from "../../components/ErrorPage.tsx";
import {useAppContext} from "../AppProvider.tsx";
import Navbar from "../../components/navbar/NavBar.tsx";
import CategoryFetch from "../../hooks/CategoryFetch.tsx";
import UpdateItemModal from "../../components/modals/UpdateCategoryModal.tsx";
import ConfirmationModal from "../../components/modals/DeleteModal.tsx";


export default function CategoryList() {
  const {arrange} = useAppContext();
  const {categories, loading, error, addCategory, updateCategory, deleteCategory} = CategoryFetch();
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    title: "",
    url: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [toggleDisplay, setToggleDisplay] = useState<boolean>(true);

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
                <div className="d-flex gap-3"> {/* Add gap between buttons */}
                  <CustomButton text={"Görünüm"} buttonBehaviour={() => setToggleDisplay(!toggleDisplay)}/>
                  <CustomButton text={"Ekle"} buttonBehaviour={() => setIsAddModalOpen(!isAddModalOpen)}/>
                </div>
              </div>
            </div>
          </div>
        </nav> : null}
        {loading ? <LoadingPage/> : error ? <ErrorPage errorMessage={error}/> :
            <div>
              <AddCategoryModal
                  open={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onAddItem={(newCategory: Category) => {
                    addCategory(newCategory);
                  }}/>
              <UpdateItemModal
                  open={isUpdateModalOpen}
                  onClose={() => setIsUpdateModalOpen(false)}
                  onUpdateItem={(updatedCategory: Category) => {
                    updatedCategory._id && updateCategory(updatedCategory._id, updatedCategory);
                    setIsUpdateModalOpen(false);
                  }}
                    category={selectedCategory}
                    setCategory={setSelectedCategory}
              />
              <ConfirmationModal
                  open={isConfirmationModalOpen}
                  onClose={() => setIsConfirmationModalOpen(false)}
                  onConfirm={() => {
                    selectedCategory._id && deleteCategory(selectedCategory._id);
                    setIsConfirmationModalOpen(false);
                  }}/>

              <div
                  className="container"
                  style={{
                    backgroundColor: "#f8f4ef",
                    padding: "30px",
                  }}

              >
                <div className="row g-3">
                  {categories &&
                      categories.map((category) => (
                        <GridDatacard
                            category={category}
                            onDelete={() => {
                              setSelectedCategory(category);
                              setIsConfirmationModalOpen(true);
                            }}
                            onEdit={() => {
                              setSelectedCategory(category);
                              setIsUpdateModalOpen(true);
                            }}/>
                      ))}
                    </div>
                </div>
            </div>

        }
      </>

  );
}
