import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/CustomButton.tsx";
import {Category} from "./Category.tsx";
import {useAppContext} from "../AppProvider.tsx";
import {TrashIcon} from "@heroicons/react/24/outline";


export interface GridDatacardProps {
    category: Category;
    onEdit: () => void;
    onDelete: () => void;
}

export default function GridDatacard({category, onDelete, onEdit}: GridDatacardProps)
{
    const {setHeader, arrange} = useAppContext();
    const blank_image_url = import.meta.env.VITE_BLANK_IMAGE_URL;
    const navigate = useNavigate();
    const handleClick = (link: string) => {
        navigate(link); // Client-side routing without page reload
    };
    return (
        <>
            <div
                className="col-6 col-sm-6 col-md-4 col-lg-3"
                key={category._id}
            >

                <div
                    className="card mb-4 shadow-sm h-100"
                    style={{
                        cursor: "pointer",
                        borderRadius: "20px",
                        height: "300px", // Set a fixed height for uniformity
                    }}
                    onClick={() => {
                        category.slug && handleClick(category.slug);
                        setHeader(category.title);
                    }}
                >
                    <img
                        src={category.url ? category.url : blank_image_url}
                        className="card-img-top"
                        alt={category.title}
                        style={{
                            width: "100%",
                            height: "200px", // Ensure all images have the same height
                            objectFit: "cover", // Crops and fits the image without distortion
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                        }}
                    />
                    <div className="card-body d-flex flex-column">
                        <h4 className="card-title text-center fs-5 fw-semibold">
                            {category.title}
                        </h4>
                        <div className="d-flex align-items-end">
                            {
                                arrange ? (
                                    <div className={"justify-content-between "}>
                                        <TrashIcon
                                            style={{width: '24px', height: '24px', color: '#EF4444'}} // Red color
                                            className="hover:text-red-600 cursor-pointer"
                                            onClick={() => {
                                                onDelete();
                                            }
                                            }
                                        />
                                        <CustomButton
                                            text={"Düzenle"}
                                            color={"#2196f3"}
                                            buttonBehaviour={onEdit}
                                        />
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
