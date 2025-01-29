import {List} from '@mui/material';
import {useState} from "react";
import {Dish} from "../Dishes/Dish.tsx";
import Navbar from "../../components/navbar/NavBar.tsx";
import ConfirmationModal from "../../components/modals/DeleteModal.tsx";
import CategoryFetch from "../../hooks/CategoryFetch.tsx";
import {Category} from "../Categories/Category.tsx";
import DishFetch from "../../hooks/DishFetch.tsx";
import {DishItem} from "./DishItem.tsx";
import {CategoryItem} from "./CategoryItem.tsx";
import AddCategoryModal from "../../components/modals/AddCategoryModal.tsx";
import UpdateItemModal from "../../components/modals/UpdateCategoryModal.tsx";
import EditDish from "./EditDish.tsx";
import AddDishModal from "../../components/modals/AddDishModal.tsx";



export default function ArrangeList() {
    const {categories, updateCategory, deleteCategory, addCategory} = CategoryFetch();
    const {dishes, deleteDish, addDish, updateDish} = DishFetch("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isAddDishModalOpen, setIsAddDishModalOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>(
        {
            title: "",
            url: "",
        }
    );
    const [selectedDish, setSelectedDish] = useState<Dish>();

    const dishesByCategory = dishes.reduce((acc, dish) => {
        const categoryId = dish.category;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(dish);
        return acc;
    }, {} as Record<string, Dish[]>);

    return (<>
            <Navbar/>
            <ConfirmationModal
                open={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={() => {
                    selectedCategory._id && deleteCategory(selectedCategory._id);
                    setIsConfirmationModalOpen(false);
                }}
            />
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
            <AddDishModal
                open={isAddDishModalOpen}
                onClose={() => setIsAddDishModalOpen(false)}
                onAddItem={(newDish: Dish) => {
                    addDish(newDish);
                }
                }
                category={selectedCategory._id!}
            />

            <div className="container-fluid vh-100 bg-light">
                <div className="row h-100">
                    <div className="col-12 col-md-8 col-lg-8 bg-white border-end p-3 overflow-auto">
                        {categories.map((category) => (
                            <div key={category._id} className="mb-4">
                                <CategoryItem
                                    category={category}
                                    onDelete={() => {
                                        setSelectedCategory(category);
                                        setIsConfirmationModalOpen(true);
                                    }
                                }
                                    onEdit={() => {
                                        setSelectedCategory(category);
                                        setIsUpdateModalOpen(true);
                                    }
                                }/>
                                    <List>
                                        {dishesByCategory[category._id!]?.map((dish) => (
                                            <div onClick={() => {
                                                setSelectedDish(dish);
                                            }}>
                                            <DishItem dish={dish}/>
                                            </div>
                                        ))}
                                    </List>
                                    <button
                                        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setIsAddDishModalOpen(true);
                                        }}
                                    >
                                        <span className="me-2">+</span>
                                    </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Pane: Details (2/3 width on md+ screens) */}
                    <div className="col-12 col-md-4 col-lg-4 p-2 overflow-auto position-fixed"
                         style={{left: "66.66%"}}>
                        {selectedDish ? (
                        <EditDish
                                dish={selectedDish}
                                onUpdateItem={(updatedDish: Dish) => {
                                    selectedDish._id && updateDish(selectedDish._id, updatedDish);
                                    setIsUpdateModalOpen(false);
                                }}
                                setDish={setSelectedDish}
                                onDeleteItem={() => {
                                    deleteDish(selectedDish._id!);
                                }
                                }
                            />
                        ) : (
                            <div className="container vh-100 d-flex justify-content-center align-items-center">
                                <div className="text-center">
                                    <h3 className="text-muted">Select a dish to edit</h3>
                                </div>
                            </div>


                        )}
                    </div>
                </div>
            </div>


        </>
    );
}