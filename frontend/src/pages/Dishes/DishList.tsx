import { useState, useEffect } from "react";
import AddButton from "./AddDish";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { DishContext } from "./DishContext";
import {getDishes} from "../../api/Dishes.tsx";
import Modal from "../../components/modal/Modal.tsx";

function DishList() {
  const {category} = useParams();
  const [data, setData] = useState<Dish[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toggleButton, setToggleButton] = useState<boolean>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setURL] = useState("");
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState<boolean>(false);
  const [dishId, setDishId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dishes = await getDishes(); // Fetch data from the API
        setData(dishes);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="text-center mb-4">
              <h1>{category?.toUpperCase()}</h1>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                onClick={() => setToggleButton(!toggleButton)}
                style={{ color: "white", marginRight: "10px" }}
              >
                Düzenle
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal/>

      <DishContext.Provider value={{dishId,setDishId,setTitle,setURL,setEdit,setData, setError, setPrice, setContent,url,edit, data, price, content, title}}>
      {toggleButton ? <AddButton /> : null}
      <DishDatacard arrange={toggleButton}
      />
        </DishContext.Provider>
    </>
  );
}

export default DishList;
