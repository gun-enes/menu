import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useCategoryContext} from "./CategoryContext.tsx";
import {useNavigate} from "react-router-dom";
import {deleteCategory} from "../../api/apiServices.tsx";

interface CategoryDatacardProps {
  arrange: boolean | undefined;
  setCategoryId: (categoryId: string) => void;
}

export default function CategoryDatacard({
  arrange,
  setCategoryId,
}: CategoryDatacardProps) 

{
  const { setTitle, setURL, setEdit, data, setData, setError} = useCategoryContext();
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link); // Client-side routing without page reload
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      const updatedData = await deleteCategory(id, data);  // Pass data to the API function
      setData(updatedData);
    } catch (error: any) {
      console.error("Error deleting category:", error.message);
      setError(error.message);
    }
  };
  return (
    <div className="row">
      <div className="col-md-2"></div>

      <div className="col-md-8">
        <List>
          {data &&
            data.map((category, index) => (
              <ListItem
              key={index}
              onClick={() => {
                handleClick(category.title);
              }}
              style={{
                background: `url(${category.url})`,
                backgroundSize: "cover",
                height: "100px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {category.title}
                  </Typography>
                }
              />
      
              {arrange ? (
                <div>
                  <Button
                    variant="contained"
                    onClick={(event) => {
                      event.stopPropagation();
                      setURL(category.url);
                      setTitle(category.title);
                      setEdit(true);
                      category._id && setCategoryId(category._id);
                    }}
                    style={{ color: "white", marginRight: "10px" }}
                  >
                    Düzenle
                  </Button>
      
                  <Button
                    variant="contained"
                    onClick={(event) => {
                      event.stopPropagation();
                      category._id && handleDeleteCategory(category._id);
                    }}
                    style={{ color: "white", backgroundColor: "red" }}
                  >
                    Sil
                  </Button>
                </div>
              ) : null}
              <IconButton
                edge="end"
                onClick={(event) => {
                  event.stopPropagation(); // Prevents triggering the ListItem's onClick event
                  console.log("Arrow clicked");
                }}
                style={{ color: "white" }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItem>
            ))}
        </List>
      </div>

      <div className="col-md-2"></div>
    </div>
  );
}
