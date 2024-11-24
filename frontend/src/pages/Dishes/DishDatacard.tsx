import {Button} from "@mui/material";
import {useDishContext} from "./DishContext.tsx";
import {deleteDish} from "../../api/Dishes.tsx";
import Modal from "../../components/modal/Modal.tsx";

interface DishDatacardProps {
  arrange: boolean | undefined;
}

export default function DishDatacard({arrange}: DishDatacardProps) {
    const { setTitle, setURL, setEdit, data,setDishId ,setPrice, setContent, setData, setError} = useDishContext();

    const handleDeleteDish = async (id: string) => {
        try {
            const updatedData = await deleteDish(id, data);  // Pass data to the API function
            setData(updatedData);
        } catch (error: any) {
            console.error("Error deleting category:", error.message);
            setError(error.message);
        }
    };
    return (
    <>
      <div className="container">
        <div className="row">
          {data &&
            data.map((item) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
                <div className="card mb-4" style={{ width: "18rem" }}>
                  {/* Make the image responsive and naturally fit the card */}
                  <img
                    src={item.url}
                    className="card-img-top"
                    alt={item.title}
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text font-weight-bold mb-0">
                        {item.price} TL
                      </p>
                      {arrange ? (
                        <div>
                          <Button
                            variant="contained"
                            style={{ color: "white" , marginRight: "10px"}}
                            onClick={(event) => {
                                event.stopPropagation();
                                setURL(item.url);
                                setTitle(item.title);
                                setContent(item.content);
                                setPrice(item.price);
                                setEdit(true);
                                item._id && setDishId(item._id);
                            }}
                          >
                            Düzenle
                          </Button>
                            <Modal item={item} handleDeleteDish={handleDeleteDish}/>


                        </div>
                      ) : null}
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
