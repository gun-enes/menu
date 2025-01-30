import {useNavigate} from "react-router-dom";
import {Category} from "../../models/Category.tsx";
import {useAppContext} from "../AppProvider.tsx";


export interface GridDatacardProps {
    category: Category;
}

export default function GridDatacard({category}: GridDatacardProps)
{
    const {setHeader} = useAppContext();
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
                    </div>
                </div>
            </div>
        </>
    );
}
