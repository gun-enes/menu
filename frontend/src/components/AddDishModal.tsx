import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'; // Using Material-UI for modern components

interface AddItemModalProps {
    open: boolean; // Controls whether the modal is open
    onClose: () => void; // Function to close the modal
    onAddItem: (title: string, url: string) => void; // Function to handle adding the item
}

export default function AddItemModal({ open, onClose, onAddItem }: AddItemModalProps) {
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {/* Modal Title */}
            <DialogTitle style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                Add New Item
            </DialogTitle>

            {/* Modal Content */}
            <DialogContent>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title"
                />
                <TextField
                    label="URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter the URL"
                />
            </DialogContent>

            {/* Modal Actions */}
            <DialogActions style={{ padding: '16px 24px' }}>
                <Button onClick={onClose} style={{ color: '#666' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    style={{ backgroundColor: '#f1356d', color: 'white' }}
                    disabled={!title || !url} // Disable the button if fields are empty
                >
                    Add Item
                </Button>
            </DialogActions>
        </Dialog>
    );
}