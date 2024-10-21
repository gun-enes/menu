import {useState, useEffect } from "react";
import axios from "axios";
import DishDatacard from "./DishDatacard";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";

function DishList() {
  const { category } = useParams();
  const [data, setData] = useState<Dish[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="text-center mb-4">
              <h1>{category?.toUpperCase()}</h1>
            </div>
          </div>
        </div>
      </div>

      <DishDatacard
        data={data}
      />
    </>
  );
}

export default DishList;
