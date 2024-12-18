import { ListItem, ListItemText, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Category } from "./Category";
import { useNavigate } from "react-router-dom";
interface ListItemsProps {
    category: Category;
    index: number | undefined;
    }

export default function ListItems( {category,index}: ListItemsProps) {
    const navigate = useNavigate();
    const handleClick = (link: string) => {
      navigate(link); // Client-side routing without page reload
    };
  return (
    <div>
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
    </div>
  );
}

