import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useCategoryContext} from "./CategoryContext.tsx";
import {useNavigate} from "react-router-dom";
import {deleteCategory} from "../../api/Categories.tsx";
import {useAppContext} from "../AppProvider.tsx";


export default function CategoryDatacard()

{
  const {data, setData, setError} = useCategoryContext();
  const {setHeader } = useAppContext();
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
                setHeader(category.title);
                handleClick(category.title);
              }}
              style={{
                background: `url(${category.url})`,
                backgroundColor: "rgba(0,0,0,0.3)",
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
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                  >
                    {category.title}
                  </Typography>
                }
              />
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
