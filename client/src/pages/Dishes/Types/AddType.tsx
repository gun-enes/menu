import { useState } from "react";
import { Type } from "./Type";
import { Button } from "@mui/material";

interface AddButtonProps {
  onAddType: (newType: Type) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAddType }) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = () => {
    const newType: Type = {
      title,
      url,
    };
    onAddType(newType); // Pass the new dish data to the parent
    setTitle(""); // Reset form fields after submission
    setURL("");
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
        
          <div className="d-flex justify-content-center">
          <Button
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
                style={{ color: "white", marginBottom: "20px" }}
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
