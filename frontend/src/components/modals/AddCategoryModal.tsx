import { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomButton from "../CustomButton.tsx";
import {Category} from "../../pages/Categories/Category.tsx";

interface AddCategoryModalProps {
    open: boolean;
    onClose: () => void;
    onAddItem: (newCategory: Category) => void;
}

export default function AddCategoryModal({ open, onClose, onAddItem }: AddCategoryModalProps) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState({ title: false, url: false });

    const validateForm = () => {
        const newErrors = {
            title: !title.trim(),
            url: !url.trim()
        };
        setErrors(newErrors);
        return !newErrors.title && !newErrors.url;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const newCategory: Category = {
                title,
                url,
            }
            onAddItem(newCategory);
            setTitle('');
            setUrl('');
            onClose();
        }
    };

    const handleFieldChange = (field: 'title' | 'url', value: string) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
        field === 'title' ? setTitle(value) : setUrl(value);
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
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <DialogTitle
                style={{
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#2D3748',
                    padding: '20px 24px 16px',
                }}
            >
                Add New Item
            </DialogTitle>

            <DialogContent style={{ padding: '16px 24px' }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    onBlur={() => setErrors(prev => ({ ...prev, title: !title.trim() }))}
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
                    onBlur={() => setErrors(prev => ({ ...prev, url: !url.trim() }))}
                    error={errors.url}
                    helperText={errors.url && "URL is required"}
                    InputProps={{
                        style: {
                            borderRadius: '8px',
                        },
                    }}
                />
            </DialogContent>

            <DialogActions style={{ padding: '16px 24px', gap: '12px' }}>
                <CustomButton
                    text={"Cancel"}
                    buttonBehaviour={onClose}
                    color={"#4A5568"}
                />
                <CustomButton
                    text={"Add Item"}
                    buttonBehaviour={handleSubmit}
                    color={"#6C63FF"}
                />
            </DialogActions>
        </Dialog>
    );
}