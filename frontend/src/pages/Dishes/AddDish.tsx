import { useState } from "react";
import { Dish } from "./Dish";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

interface AddButtonProps {
  onAddDish: (newDish: Dish) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAddDish }) => {
  const { type = "", category = "" } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setURL] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    const newDish: Dish = {
      title,
      content,
      type,
      price,
      url,
      category,
    };
    onAddDish(newDish); // Pass the new dish data to the parent
    setTitle(""); // Reset form fields after submission
    setContent("");
    setURL("");
    setPrice(0);
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
            aria-label="Server"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <span className="input-group-text">.00</span>
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

          <div className="input-group">
            <span className="input-group-text">Açıklama</span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-center">
          <Button
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
                style={{ color: "white",marginBottom: "20px", marginTop: "20px" }}
              >
                Ekle
              </Button>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default AddButton;

// import React from 'react'

// interface AddButtonProps {
//   onClick: () => void
// }

// function AddButton({onClick}: AddButtonProps) {
//   return (
//     <button
//     onClick={onClick}
//     >
//       Add Menu
//     </button>
//   )
// }

// export default AddButton