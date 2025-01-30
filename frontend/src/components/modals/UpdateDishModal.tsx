import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Dish} from "../../models/Dish.tsx";

interface UpdateDishModalProps {
    open: boolean;
    onClose: () => void;
    onUpdateItem: (dish:Dish) => void;
    dish: Dish;
    setDish: (dish: Dish) => void;
}

export default function UpdateDishModal({
                                            open,
                                            onClose,
                                            onUpdateItem,
                                            dish,
                                            setDish
                                        }: UpdateDishModalProps) {
    const [errors, setErrors] = useState({
        title: false,
        price: false  // Removed url and content from errors
    });

    const validateForm = () => {
        const newErrors = {
            title: !dish.title.trim(),
            price: dish.price <= 0  // Only validate title and price
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onUpdateItem(dish);
            resetForm();
            onClose();
        }
    };

    const resetForm = () => {
        setDish({
            title: '',
            url: '',
            content: '',
            price: 0,
            category: ''
        });
        setErrors({ title: false, price: false });  // Reset only relevant errors
    };

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
                Kategori Düzenle
            </DialogTitle>

            <DialogContent style={{ padding: '16px 24px' }}>
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
            </DialogContent>

            <DialogActions style={{ padding: '16px 24px', gap: '12px' }}>
                <Button
                    onClick={() => { resetForm(); onClose(); }}
                    style={{
                        color: '#4A5568',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                >
                    İptal
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
                        boxShadow: 'none',
                        fontWeight: 500
                    }}
                >
                    Güncelle
                </Button>
            </DialogActions>
        </Dialog>
    );
}