import { Category } from "./Category";
import { Button } from "@mui/material";
import {useCategoryContext} from "./CategoryContext.tsx";
import {addCategory, updateCategory} from "../../api/apiServices.tsx";

interface AddButtonProps {
  title: string;
  url: string;
  edit: boolean;
  categoryId: string;
}

export default function AddButton({title, url, edit, categoryId} : AddButtonProps) {
  const { setTitle, setURL, setEdit, data,setData,setError } = useCategoryContext();
  const handleSubmit = async () => {
    try {
      const newCategory: Category = {
        title,
        url,
      };
      const updatedData = await addCategory(newCategory, data); // Pass data to the API function
      setData(updatedData);
      setTitle(""); // Reset form fields after submission
      setURL("");
      setEdit(false);
    } catch (error: any) {
      console.error("Error adding new category:", error.message);
      setError(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const newCategory: Category = {
        title,
        url,
      };
      const updatedData = await updateCategory(categoryId, newCategory, data);  // Pass data to the API function
      setData(updatedData);
      setTitle(""); // Reset form fields after submission
      setURL("");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
      <div className="col-md-3"></div>
    </div>
  );
};
