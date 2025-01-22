import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface UpdateDishModalProps {
    open: boolean;
    onClose: () => void;
    onUpdateItem: (id: string, title: string, url: string, price: number, category: string, content: string) => void;
    title: string;
    url: string;
    content: string;
    setContent: (content: string) => void;
    price: number;
    setPrice: (price: number) => void;
    category: string;
    setTitle: (title: string) => void;
    setUrl: (url: string) => void;
    id: string;
}

export default function UpdateDishModal({
                                            open,
                                            onClose,
                                            onUpdateItem,
                                            id,
                                            url,
                                            setUrl,
                                            title,
                                            setTitle,
                                            content,
                                            setContent,
                                            price,
                                            setPrice,
                                            category
                                        }: UpdateDishModalProps) {
    const [errors, setErrors] = useState({
        title: false,
        url: false,
        price: false,
        content: false
    });

    const validateForm = () => {
        const newErrors = {
            title: !title.trim(),
            url: !url.trim(),
            price: price <= 0,
            content: !content.trim()
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onUpdateItem(id, title, url, price, category, content);
            resetForm();
            onClose();
        }
    };

    const resetForm = () => {
        setTitle('');
        setUrl('');
        setContent('');
        setPrice(0);
        setErrors({ title: false, url: false, price: false, content: false });
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
                Kategori Düzenle
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
                    helperText={errors.url && "Valid URL is required"}
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
                    value={content}
                    onChange={(e) => handleFieldChange('content', e.target.value)}
                    onBlur={() => setErrors(prev => ({ ...prev, content: !content.trim() }))}
                    error={errors.content}
                    helperText={errors.content && "Content is required"}
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
                    onBlur={() => setErrors(prev => ({ ...prev, price: price <= 0 }))}
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