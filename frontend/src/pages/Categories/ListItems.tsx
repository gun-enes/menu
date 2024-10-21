import React from "react";
import { ListItem, ListItemText, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Category } from "./Category";
import { useNavigate } from "react-router-dom";
interface ListItemsProps {
    category: Category;
    index: number | undefined;
    edit: boolean | undefined;
    handleDeleteCategory: (id: string) => void;
    }

export default function ListItems( {}: ListItemsProps) {
    const navigate = useNavigate();
    const handleClick = (link: string) => {
      navigate(link); // Client-side routing without page reload
    };
  return (
    <div>
  
    </div>
  );
}

