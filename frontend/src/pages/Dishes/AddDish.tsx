import { Dish } from "./Dish";
import { Button } from "@mui/material";
import {useDishContext} from "./DishContext.tsx";
import {updateDish} from "../../api/apiServices.tsx";
import {useParams} from "react-router-dom";

interface AddButtonProps {
  onAddDish: (newDish: Dish) => void;
}

export default function AddButton({ onAddDish }: AddButtonProps) {
  const {category} = useParams();
  const { setTitle, setURL, edit,dishId,setEdit,data, setData, setError,url, title, content, price, setPrice, setContent} = useDishContext();
  const handleSubmit = () => {
    const newDish: Dish = {
      title,
      content,
      price,
      url,
      category,
    };
    onAddDish(newDish); // Pass the new dish data to the parent
    setTitle(""); // Reset form fields after submission
    setContent("");
    setURL("");
    setPrice(0);
  };

  const handleEdit = async () => {
    try {
      const newDish: Dish = {
        title,
        content,
        price,
        url,
        category,
      };
      const updatedData = await updateDish(dishId, newDish, data);  // Pass data to the API function
      setData(updatedData);
      setTitle(""); // Reset form fields after submission
      setURL("");
      setContent("");
      setPrice(0);
      setEdit(false);
    } catch (error: any) {
      console.error("Error updating category:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Başlık"
            aria-label="Server"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <span className="input-group-text">.00</span>
        </div>
        <div>
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Resim URL'si"
                id="basic-url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                aria-describedby="basic-addon3 basic-addon4"
              />
            </div>
          </div>

          <div className="input-group">
            <span className="input-group-text">Açıklama</span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-center">
            {
              // If the edit prop is true, render the Edit button
              edit ? (
                      <div className="d-flex justify-content-center">
                        <Button
                            variant="contained"
                            onClick={() => {
                              handleEdit();
                            }}
                            style={{color: "white", backgroundColor: "green"}}
                        >
                          Düzenle
                        </Button>
                      </div>
                  ) :
                  <div className="d-flex justify-content-center">
                    <Button
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        }}
                        style={{color: "white"}}
                    >
                      Ekle
                    </Button>
                  </div>
            }
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};
