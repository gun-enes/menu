import { useState, useEffect } from "react";
import { Category } from "./Category";
import CategoryDatacard from "./CategoryDatacard";
import {CategoryContext} from "./CategoryContext.tsx";
import {addCategory, getCategories} from "../../api/Categories.tsx";
import GridDatacard from "./GridDatacard.tsx";
import Navbar from "../../components/NavBar.tsx";
import CustomButton from "../../components/CustomButton.tsx";
import AddCategoryModal from "../../components/AddCategoryModal.tsx";


export default function CategoryList() {
  const [data, setData] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toggleDisplay, setToggleDisplay] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories(); // Fetch data from the API
        setData(categories);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (title: string, url: string) => {
    try {
      const newCategory: Category = {
        title,
        url,
      };
      const updatedData = await addCategory(newCategory, data); // Pass data to the API function
      setData(updatedData);
    } catch (error: any) {
      console.error("Error adding new category:", error.message);
      setError(error.message);
    }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <>

        <Navbar title={"MENÜ"}/>

        <nav style={{
          background: 'linear-gradient(90deg, #f1356d, #e91e63)', // Gradient background
          padding: '0px 0px 30px 0px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex gap-3"> {/* Add gap between buttons */}
                  <CustomButton text={"Görünüm"} buttonBehaviour={() => setToggleDisplay(!toggleDisplay)}/>
                  <CustomButton text={"Ekle"} buttonBehaviour={() => setIsModalOpen(!isModalOpen)}/>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <AddCategoryModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleSubmit}/>

        <CategoryContext.Provider value={{data, setData, setError}}>
            {toggleDisplay ?
                <GridDatacard/>
                :
                <CategoryDatacard arrange={true} setCategoryId={()=>{}}/>}
        </CategoryContext.Provider>
      </>

  );
}
