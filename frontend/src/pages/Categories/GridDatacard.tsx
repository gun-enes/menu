import {useCategoryContext} from "./CategoryContext.tsx";
import {useNavigate} from "react-router-dom";
import {deleteCategory, updateCategory} from "../../api/Categories.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import {Category} from "./Category.tsx";
import UpdateItemModal from "../../components/UpdateCategoryModal.tsx";
import {useState} from "react";
import ConfirmationModal from "../../components/DeleteModal.tsx";


export default function GridDatacard()
{
    const {data, setData, setError} = useCategoryContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [id, setId] = useState("");

    const navigate = useNavigate();

    const handleClick = (link: string) => {
        navigate(link); // Client-side routing without page reload
    };
    const handleDeleteCategory = async (id: string) => {
        try {
            const updatedData = await deleteCategory(id, data);  // Pass data to the API function
            setData(updatedData);
        } catch (error: any) {
            console.error("Error deleting category:", error.message);
            setError(error.message);
        }
    };
    const handleEdit = async (categoryId: string, title: string, url: string) => {
        try {
            const newCategory: Category = {
                title,
                url,
            };
            const updatedData = await updateCategory(categoryId, newCategory, data);  // Pass data to the API function
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
                <div className="row">
                    {data &&
                        data.map((category) => (

                            <div
                                className="col-sm-6 col-md-4 col-lg-3 mb-4"
                                key={category._id}

                            >
                                <UpdateItemModal
                                    open={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onUpdateItem={handleEdit}
                                    title={title}
                                    setTitle={setTitle}
                                    url={url}
                                    setUrl={setUrl}
                                    id={id}
                                />
                                <ConfirmationModal
                                    open={isConfirmationModalOpen}
                                    onClose={() => setIsConfirmationModalOpen(false)}
                                    onConfirm={()=> {
                                        category._id && handleDeleteCategory(category._id);
                                        setIsConfirmationModalOpen(false);
                                    }}/>
                                <div className="card mb-4"
                                     style={{ cursor: "pointer", borderRadius: "20px", width: "18rem" }}
                                >
                                    <img
                                        src={category.url}
                                        className="card-img-top"
                                        alt={category.title}
                                        onClick={() => {
                                            category._id && handleClick(category._id);
                                        }}
                                        style={{
                                            objectFit: "contain",
                                            height: "170px",
                                            padding: "0px" // Add padding here
                                        }}                                    />
                                    <div
                                        className="card-body"
                                    >
                                        <h4
                                            className="card-title"
                                            //center it
                                            style={{textAlign: "center", fontSize: "1.5rem", fontWeight: 600}}
                                        >
                                            {category.title}
                                        </h4>
                                        <div className="d-flex justify-content-around align-items-center">

                                                <CustomButton text={"Düzenle"}
                                                              color={"#2196f3"}
                                                              buttonBehaviour={() => {
                                                                  setTitle(category.title);
                                                                  setUrl(category.url);
                                                                  setIsModalOpen(true);
                                                                  category._id && setId(category._id);
                                                              }}/>


                                                <CustomButton text={"Delete"}
                                                              color={"#f44336"}
                                                              buttonBehaviour={() => {
                                                                    setIsConfirmationModalOpen(true);
                                                                }}/>
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
