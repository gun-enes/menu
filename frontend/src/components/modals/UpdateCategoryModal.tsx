import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Category} from "../../pages/Categories/Category.tsx";

interface UpdateCategoryModalProps {
    open: boolean;
    onClose: () => void;
    onUpdateItem: (newCategory: Category) => void;
    category: Category;
    setCategory: (category: Category) => void;
}

export default function UpdateCategoryModal({
                                                open,
                                                onClose,
                                                onUpdateItem,
                                                category,
                                                setCategory
                                            }: UpdateCategoryModalProps) {
    const [errors, setErrors] = useState({
        title: false,
        url: false
    });

    const validateForm = () => {
        const newErrors = {
            title: !category.title.trim(),
            url: !category.url.trim()
        };
        setErrors(newErrors);
        return !newErrors.title && !newErrors.url;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onUpdateItem(category);
            resetForm();
            onClose();
        }
    };

    const resetForm = () => {
        setCategory({
            title: '',
            url: '',
        });
        setErrors({ title: false, url: false });
    };

    const handleFieldChange = (field: 'title' | 'url', value: string) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
        field === 'title' ? setCategory({ ...category, title: value }) : setCategory({ ...category, url: value });
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
                    value={category.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    onBlur={() => setErrors(prev => ({ ...prev, title: !category.title.trim() }))}
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
                    value={category.url}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    onBlur={() => setErrors(prev => ({ ...prev, url: !category.url.trim() }))}
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
                    İPTAL
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