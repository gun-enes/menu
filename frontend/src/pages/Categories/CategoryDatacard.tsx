import { Category } from "./Category";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";

interface CategoryDatacardProps {
  data: Category[] | null;
  edit: boolean | undefined;
  handleDeleteCategory: (id: string) => void;
}

export default function CategoryDatacard({
  data,
  edit,
  handleDeleteCategory,
}: CategoryDatacardProps) 

{
  const navigate = useNavigate();
const handleClick = (link: string) => {
  navigate(link); // Client-side routing without page reload
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
      
              {edit ? (
                <div>
                  <Button
                    variant="contained"
                    onClick={(event) => {
                      event.stopPropagation();
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
                    style={{ color: "white" }}
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
