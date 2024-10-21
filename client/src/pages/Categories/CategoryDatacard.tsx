import { Category } from "./Category";
import {
  List,
} from "@mui/material";

import ListItems from "./ListItems";

interface CategoryDatacardProps {
  data: Category[] | null;
}

export default function CategoryDatacard({
  data,
}: CategoryDatacardProps) 
{


  return (
    <div className="row">
      <div className="col-md-2"></div>

      <div className="col-md-8">
        <List>
          {data &&
            data.map((category, index) => (
              <ListItems category={category} index={index}/>
            ))}
        </List>
      </div>

      <div className="col-md-2"></div>
    </div>
  );
}
