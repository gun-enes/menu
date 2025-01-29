import {Dish} from "../Dishes/Dish.tsx";
import {Button, TextField} from "@mui/material";
import {useState} from "react";

export interface EditDishProps {
    dish: Dish;
    onUpdateItem: (dish: Dish) => void;
    setDish: (dish: Dish) => void;
    onDeleteItem: () => void;
}

export default function EditDish({
                                         dish,
                                            onUpdateItem,
                                            onDeleteItem,
                                            setDish
                                     }: EditDishProps) {

    const [errors, setErrors] = useState({
        title: false,
        price: false  // Removed url and content from errors
    });


    const handleFieldChange = (field: string, value: string | number) => {
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }

        switch(field) {
            case 'title':
                setDish({
                    ...dish,
                    title: String(value)
                }); break;
            case 'url':
                setDish({
                    ...dish,
                    url: String(value)
                }); break;
            case 'content':
                setDish({
                    ...dish,
                    content: String(value)
                }); break;
            case 'price':
                setDish({
                    ...dish,
                    price: Number(value)
                }); break;
        }
    };
    return (
        <div
            className="col-12 col-sm-12 col-md-12 col-lg-12 mb-8"
            key={dish._id}
        >

            <div className="card mb-4 shadow-sm"
                 style={{borderRadius: "20px"}}
            >
                <img
                    src={dish.url == "" ? import.meta.env.VITE_BLANK_IMAGE_URL : dish.url}
                    className="card-img-top"
                    alt={dish.title}
                    style={{
                        objectFit: "contain",
                        height: "340px",
                        padding: "0px", // Add padding here
                        borderRadius: "20px"
                    }}/>
                <div className="card-body d-flex flex-column">
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={dish.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        onBlur={() => setErrors(prev => ({ ...prev, title: !dish.title.trim() }))}
                        error={errors.title}
                        helperText={errors.title && "Title is required"}
                        InputProps={{
                            style: {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <TextField
                        label="URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={dish.url}
                        onChange={(e) => handleFieldChange('url', e.target.value)}
                        // Removed validation for URL
                        InputProps={{
                            style: {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={dish.content}
                        onChange={(e) => handleFieldChange('content', e.target.value)}
                        // Removed validation for content
                        InputProps={{
                            style: {
                                borderRadius: '8px',
                            },
                        }}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={dish.price}
                        onChange={(e) => handleFieldChange('price', e.target.value)}
                        onBlur={() => setErrors(prev => ({ ...prev, price: dish.price <= 0 }))}
                        error={errors.price}
                        helperText={errors.price && "Price must be greater than 0"}
                        InputProps={{
                            style: {
                                borderRadius: '8px',
                            },
                            inputProps: {
                                min: 0.01,
                                step: 0.01
                            }
                        }}
                    />
                    <div style={{display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center'}}>
                        {/* Delete Button */}
                        <Button
                            onClick={onDeleteItem}
                            variant="outlined"
                            style={{
                                color: '#E53E3E', // Red color for delete action
                                borderColor: '#E53E3E', // Matching border color
                                borderRadius: '8px',
                                padding: '8px 24px',
                                textTransform: 'none',
                                fontWeight: 500,
                                transition: 'all 0.3s ease', // Smooth hover transition
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FED7D7'; // Light red on hover
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'; // Reset on hover out
                            }}
                        >
                            Sil
                        </Button>

                        {/* Update Button */}
                        <Button
                            onClick={() => onUpdateItem(dish)}
                            variant="contained"
                            style={{
                                backgroundColor: '#6C63FF', // Purple color
                                color: 'white',
                                borderRadius: '8px',
                                padding: '8px 24px',
                                textTransform: 'none',
                                boxShadow: 'none',
                                fontWeight: 500,
                                transition: 'all 0.3s ease', // Smooth hover transition
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#7B73FF'; // Slightly lighter purple on hover
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#6C63FF'; // Reset on hover out
                            }}
                        >
                            Güncelle
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}