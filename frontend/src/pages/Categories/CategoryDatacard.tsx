import { Category } from "./Category";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Icon,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";

import ListItems from "./ListItems";

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


  return (
    <div className="row">
      <div className="col-md-2"></div>

      <div className="col-md-8">
        <List>
          {data &&
            data.map((category, index) => (
              <ListItems category={category} index={index} edit={edit} handleDeleteCategory={handleDeleteCategory}/>
            ))}
        </List>
      </div>

      <div className="col-md-2"></div>
    </div>
  );
}
