import { useState, useEffect } from "react";
import axios from "axios";
import AddButton from "./AddCategory";
import { useParams } from "react-router-dom";
import { Category } from "./Category";
import CategoryDatacard from "./CategoryDatacard";
import { Button } from "@mui/material";

export default function CategoryList() {
  const { type } = useParams();
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toggleButton, setToggleButton] = useState<boolean>();

  // Function to add a new category and update the list
  const handleAddCategory = async (newCategory: Category) => {
    try {
      const response = await axios.post<Category>(
        "http://localhost:4000/categories",
        newCategory
      );
      // Add the new category to the existing list
      if (data) {
        setData([...data, response.data]);
      }
    } catch (error: any) {
      console.error("Error adding new category:", error.message);
      setError(error.message);
    }
  };

  // Fetch the categories data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Category[]>(
          `http://localhost:4000/categories/${type}`
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

  // Function to delete a category by ID
  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/categories/${id}`);
      // After successful deletion, update the list
      if (data) {
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error: any) {
      console.error("Error deleting category:", error.message);
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
              <h1>MENÜ</h1>
            </div>
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                onClick={() => {
                  setToggleButton(!toggleButton);
                }}
                style={{ color: "white" }}
              >
                Düzenle
              </Button>
            </div>
          </div>
        </div>
      </div>
      {toggleButton ? <AddButton onAddCategory={handleAddCategory} /> : null}
      <CategoryDatacard
        data={data}
        edit={toggleButton}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  );
}
