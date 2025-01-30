import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Dish} from "../../models/Dish.tsx";

interface AddDishModalProps {
    open: boolean;
    onClose: () => void;
    onAddItem: (dish: Dish) => void;
    category: string;
}

export default function AddDishModal({ open, onClose, onAddItem, category }: AddDishModalProps) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({
        title: false,
        price: false  // Removed url and content from errors
    });

    const validateField = (name: string, value: string | number) => {
        if (name === 'price') {
            return Number(value) > 0;
        }
        return String(value).trim() !== '';
    };

    const handleSubmit = () => {
        const newErrors = {
            title: !validateField('title', title),
            price: !validateField('price', price)  // Only validate title and price
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error)) {
            const newDish = {
                title,
                url,
                price,
                content,
                category
            }
            onAddItem(newDish);
            resetForm();
            onClose();
        }
    };

    const resetForm = () => {
        setTitle('');
        setUrl('');
        setPrice(0);
        setContent('');
        setErrors({ title: false, price: false });  // Reset only relevant errors
    };

    const handleFieldChange = (field: string, value: string | number) => {
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }

        switch(field) {
            case 'title': setTitle(String(value)); break;
            case 'url': setUrl(String(value)); break;
            case 'price': setPrice(Number(value)); break;
            case 'content': setContent(String(value)); break;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                },
            }}
        >
            <DialogTitle style={{
                textAlign: 'center',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#2D3748',
                padding: '20px 24px 16px',
            }}>
                Add New Dish
            </DialogTitle>

            <DialogContent style={{ padding: '16px 24px' }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    onBlur={() => setErrors(prev => ({ ...prev, title: !validateField('title', title) }))}
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
                    value={url}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    // Removed validation for URL
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
                    value={price}
                    onChange={(e) => handleFieldChange('price', e.target.value)}
                    onBlur={() => setErrors(prev => ({ ...prev, price: !validateField('price', price) }))}
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
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    value={content}
                    onChange={(e) => handleFieldChange('content', e.target.value)}
                    // Removed validation for content
                    InputProps={{
                        style: {
                            borderRadius: '8px',
                        },
                    }}
                />
            </DialogContent>

            <DialogActions style={{ padding: '16px 24px', gap: '12px' }}>
                <Button
                    onClick={() => { resetForm(); onClose(); }}
                    style={{
                        color: '#4A5568',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        textTransform: 'none'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    style={{
                        backgroundColor: '#6C63FF',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '8px 24px',
                        textTransform: 'none',
                        boxShadow: 'none'
                    }}
                >
                    Add Dish
                </Button>
            </DialogActions>
        </Dialog>
    );
}