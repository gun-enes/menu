import { useState, useEffect } from "react";
import AddButton from "./AddCategory";
import { Category } from "./Category";
import CategoryDatacard from "./CategoryDatacard";
import { Button } from "@mui/material";
import {CategoryContext} from "./CategoryContext.tsx";
import {getCategories} from "../../api/Categories.tsx";


export default function CategoryList() {
  const [data, setData] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toggleButton, setToggleButton] = useState<boolean>();
  const [toggleDisplay, setToggleDisplay] = useState<boolean>(true);
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [edit, setEdit] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");


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
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-end">
                  <Button
                      variant="contained"
                      onClick={() => setToggleDisplay(!toggleDisplay)}
                      style={{color: "white"}}
                  >
                    Izgara Görünümü
                  </Button>
                </div>
              </div>
              <div className="col"
                  /*style={{display: "flex", justifyContent: "flex-end"}}*/>
                <div className="d-flex justify-content-start">
                  <Button
                      variant="contained"
                      onClick={() => {
                        setToggleButton(!toggleButton);
                        setTitle(""); // Reset form fields after submission
                        setURL("");
                        setEdit(false);
                      }}
                      style={{color: "white"}}
                  >
                    Düzenle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleDisplay ?
      <CategoryContext.Provider value={{setTitle, setURL, setEdit, data, setData, setError}}>
        {toggleButton ? <AddButton title={title} url={url} edit={edit} categoryId={categoryId}/> : null}
        <CategoryDatacard arrange={toggleButton} setCategoryId={setCategoryId}/>
      </CategoryContext.Provider>
      :
      null}
    </>

  );
}
