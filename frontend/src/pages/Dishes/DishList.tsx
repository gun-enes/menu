import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AddButton from "./AddDish";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

function DishList() {
  const {category } = useParams();
  const [data, setData] = useState<Dish[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toggleButton, setToggleButton] = useState<boolean>();

  // Function to add a new dish and update the list
  const handleAddDish = async (newDish: Dish) => {
    try {
      const response = await axios.post<Dish>(
        "http://localhost:4000/dishes",
        newDish
      );
      // Add the new dish to the existing list
      if (data) {
        setData([...data, response.data]);
      }
    } catch (error: any) {
      console.error("Error adding new dish:", error.message);
      setError(error.message);
    }
  };

  // Fetch the dishes data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Dish[]>(
          `http://localhost:4000/dishes/${category}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to delete a dish by ID
  const handleDeleteDish = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/dishes/${id}`);
      // After successful deletion, update the list
      if (data) {
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error: any) {
      console.error("Error deleting dish:", error.message);
      setError(error.message);
    }
  };

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
      {toggleButton ? <AddButton onAddDish={handleAddDish} /> : null}

      <DishDatacard
        data={data}
        edit={toggleButton}
        handleDeleteDish={handleDeleteDish}
      />
    </>
  );
}

export default DishList;
