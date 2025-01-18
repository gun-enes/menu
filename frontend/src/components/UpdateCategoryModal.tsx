import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface UpdateItemModalProps {
    open: boolean; // Controls whether the modal is open
    onClose: () => void; // Function to close the modal
    onUpdateItem: (id: string, title: string, url: string) => void;
    title: string;
    url: string;
    setTitle: (title: string) => void;
    setUrl: (url: string) => void;
    id: string;
}

export default function UpdateItemModal({ open, onClose, onUpdateItem, id, url, setUrl , title , setTitle}: UpdateItemModalProps) {

    // Handle form submission
    const handleSubmit = () => {
        if (title && url && id) {
            onUpdateItem(id, title, url); // Pass the title and URL to the parent component
            setTitle(''); // Reset the title field
            setUrl(''); // Reset the URL field
            onClose(); // Close the modal
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {/* Modal Title */}
            <DialogTitle style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                Kategori Düzenle
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
                <Button onClick={()=>{
                    setUrl("");
                    setTitle("");
                    onClose();
                }} style={{ color: '#666' }}>
                    İPTAL
                </Button>
                <Button
                    onClick={()=>{
                        setUrl("");
                        setTitle("");
                        handleSubmit();
                    }}
                    variant="contained"
                    style={{ backgroundColor: '#f1356d', color: 'white' }}
                    disabled={!title || !url} // Disable the button if fields are empty
                >
                    Güncelle
                </Button>
            </DialogActions>
        </Dialog>
    );
}