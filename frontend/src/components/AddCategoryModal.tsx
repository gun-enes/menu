import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'; // Using Material-UI for modern components

interface AddCategoryModalProps {
    open: boolean; // Controls whether the modal is open
    onClose: () => void; // Function to close the modal
    onAddItem: (title: string, url: string) => void; // Function to handle adding the item
}

export default function AddCategoryModal({ open, onClose, onAddItem }: AddCategoryModalProps) {
    const [title, setTitle] = useState(''); // State for the title field
    const [url, setUrl] = useState(''); // State for the URL field

    // Handle form submission
    const handleSubmit = () => {
        if (title && url) {
            onAddItem(title, url); // Pass the title and URL to the parent component
            setTitle(''); // Reset the title field
            setUrl(''); // Reset the URL field
            onClose(); // Close the modal
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
                    borderRadius: '16px', // Rounded corners for the modal
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                },
            }}
        >
            {/* Modal Title */}
            <DialogTitle
                style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#333', // Darker text for better contrast
                    padding: '24px 24px 16px 24px', // Adjusted padding
                }}
            >
                Add New Item
            </DialogTitle>

            {/* Modal Content */}
            <DialogContent style={{ padding: '16px 24px' }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title"
                    InputProps={{
                        style: {
                            borderRadius: '12px', // Rounded corners for the input
                        },
                    }}
                />
                <TextField
                    label="URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter the URL"
                    InputProps={{
                        style: {
                            borderRadius: '12px', // Rounded corners for the input
                        },
                    }}
                />
            </DialogContent>

            {/* Modal Actions */}
            <DialogActions style={{ padding: '16px 24px' }}>
                <Button
                    onClick={onClose}
                    style={{
                        color: '#666',
                        borderRadius: '12px', // Rounded corners for the button
                        padding: '8px 20px', // Adjusted padding
                        textTransform: 'none', // Prevent uppercase
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    style={{
                        backgroundColor: '#f1356d',
                        color: 'white',
                        borderRadius: '12px', // Rounded corners for the button
                        padding: '8px 20px', // Adjusted padding
                        textTransform: 'none', // Prevent uppercase
                        boxShadow: 'none', // Remove default shadow
                    }}
                    disabled={!title || !url} // Disable the button if fields are empty
                >
                    Add Item
                </Button>
            </DialogActions>
        </Dialog>
    );
}