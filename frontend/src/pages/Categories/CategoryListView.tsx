import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Category} from "./Category.tsx";
import {useNavigate} from "react-router-dom";


export interface CategoryListViewProps {
  category: Category;
}

export default function CategoryListView({category}: CategoryListViewProps) {
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link); // Client-side routing without page reload
  };
  return (
      <ListItem
          key={category._id}
          onClick={() => {
            category.slug && handleClick(category.slug);
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
  );
}
