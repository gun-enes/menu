import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "./Category";
import CategoryDatacard from "./CategoryDatacard";

export default function CategoryList() {
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to add a new category and update the list

  // Fetch the categories data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Category[]>(
          `http://localhost:4000/categories/`
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
              <h1>MENÜ</h1>
            </div>
          </div>
        </div>
      </div>
      <CategoryDatacard
        data={data}
      />
    </>
  );
}
