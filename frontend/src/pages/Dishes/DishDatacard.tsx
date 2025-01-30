
import CustomButton from "../../components/CustomButton.tsx";
import {Dish} from "../../models/Dish.tsx";

export interface DishDatacardProps {
    dish: Dish;
    onDelete: () => void;
    onEdit: () => void;
    arrange: boolean;
}

export default function DishDatacard({
                                            dish,
                                            onDelete,
                                            onEdit,
                                            arrange,
                                     }: DishDatacardProps) {
    return (
        <div
            className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={dish._id}

        >

            <div className="card mb-4 shadow-sm"
                 style={{cursor: "pointer", borderRadius: "20px"}}
            >
                <img
                    src={dish.url == "" ? import.meta.env.VITE_BLANK_IMAGE_URL : dish.url}
                    className="card-img-top"
                    alt={dish.title}
                    style={{
                        objectFit: "contain",
                        height: "170px",
                        padding: "0px", // Add padding here
                        borderRadius: "20px"
                    }}/>
                <div className="card-body d-flex flex-column">
                    <h4 className="card-title text-center fs-5 fw-semibold">
                        {dish.title}
                    </h4>
                    <p
                        className="card-text"
                        style={{fontSize: "1rem", fontWeight: 400}}
                    >
                        {dish.content}
                    </p>
                    <h5
                        className="card-text justify-content-end"
                        style={{fontWeight: 500, textAlign: "right"}}
                    >
                        ₺{dish.price}
                    </h5>
                    <div className="d-flex justify-content-around align-items-center">
                        {arrange ? <div>
                            <CustomButton text={"Düzenle"}
                                          color={"#2196f3"}
                                          buttonBehaviour={onEdit}/>


                            <CustomButton text={"Delete"}
                                          color={"#f44336"}
                                          buttonBehaviour={onDelete}/>

                        </div> : null}


                    </div>
                </div>
            </div>
        </div>
    );
}