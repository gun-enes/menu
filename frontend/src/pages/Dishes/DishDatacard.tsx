import {useDishContext} from "./DishContext.tsx";
import {deleteDish, updateDish} from "../../api/Dishes.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import ConfirmationModal from "../../components/modals/DeleteModal.tsx";
import {useState} from "react";
import UpdateDishModal from "../../components/modals/UpdateDishModal.tsx";
import {Dish} from "./Dish.tsx";
import {useAppContext} from "../AppProvider.tsx";

export default function DishDatacard() {
    const {data, setData, setError} = useDishContext();
    const {arrange} = useAppContext();
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [id, setId] = useState("");
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
    const blank_image_url = import.meta.env.VITE_BLANK_IMAGE_URL;

    const handleDeleteDish = async (id: string) => {
        try {
            const updatedData = await deleteDish(id, data);
            setData(updatedData);
        } catch (error: any) {
            console.error("Error deleting category:", error.message);
            setError(error.message);
        }
    };
    const handleEdit = async (id: string, title: string, url: string, price: number, content: string, category:string) => {
        try {
            const newDish: Dish = {
                title,
                content,
                price,
                url,
                category,
            };
            const updatedData = await updateDish(id, newDish, data);  // Pass data to the API function
            setData(updatedData);
        } catch (error: any) {
            console.error("Error updating category:", error.message);
            setError(error.message);
        }
    };
    return (
        <>
            <div
                className="container"
                style={{
                    backgroundColor: "#f8f4ef",
                    padding: "30px",
                }}

            >
                <UpdateDishModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateItem={handleEdit}
                    title={title}
                    setTitle={setTitle}
                    url={url}
                    setUrl={setUrl}
                    id={id}
                    price={price}
                    setPrice={setPrice}
                    content={content}
                    setContent={setContent}
                    category={category}
                />
                <ConfirmationModal
                    open={isConfirmationModalOpen}
                    onClose={() => setIsConfirmationModalOpen(false)}
                    onConfirm={() => {
                        id && handleDeleteDish(id);
                        setIsConfirmationModalOpen(false);
                    }}/>

                <div className="row g-3">
                    {data &&
                        data.map((category) => (

                            <div
                                className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4"
                                key={category._id}

                            >

                                <div className="card mb-4 shadow-sm"
                                     style={{cursor: "pointer", borderRadius: "20px"}}
                                >
                                    <img
                                        src={category.url == '' ? category.url : blank_image_url}
                                        className="card-img-top"
                                        alt={category.title}
                                        style={{
                                            objectFit: "contain",
                                            height: "170px",
                                            padding: "0px", // Add padding here
                                            borderRadius: "20px"
                                        }}/>
                                    <div className="card-body d-flex flex-column">
                                        <h4 className="card-title text-center fs-5 fw-semibold">
                                            {category.title}
                                        </h4>
                                        <p
                                            className="card-text"
                                            style={{fontSize: "1rem", fontWeight: 400}}
                                        >
                                            {category.content}
                                        </p>
                                        <h5
                                            className="card-text justify-content-end"
                                            style={{fontWeight: 500, textAlign: "right"}}
                                        >
                                            ₺{category.price}
                                        </h5>
                                        <div className="d-flex justify-content-around align-items-center">
                                            {arrange ? <div>
                                                <CustomButton text={"Düzenle"}
                                                              color={"#2196f3"}
                                                              buttonBehaviour={() => {
                                                                  setTitle(category.title);
                                                                  setUrl(category.url);
                                                                  setPrice(category.price);
                                                                  setContent(category.content);
                                                                  setCategory(category.category);
                                                                  setIsModalOpen(true);
                                                                  category._id && setId(category._id);
                                                              }}/>


                                                <CustomButton text={"Delete"}
                                                              color={"#f44336"}
                                                              buttonBehaviour={() => {
                                                                  category._id && setId(category._id);
                                                                  setIsConfirmationModalOpen(true);
                                                              }}/>


                                                </div> : null}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}