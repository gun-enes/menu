import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface UpdateDishModalProps {
    open: boolean; // Controls whether the modal is open
    onClose: () => void; // Function to close the modal
    onUpdateItem: (id: string, title: string, url: string, price: number, category: string, content:string) => void;
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

export default function UpdateDishModal({ open, onClose, onUpdateItem, id, url, setUrl , title , setTitle, content, setContent, price, setPrice, category}: UpdateDishModalProps) {

    // Handle form submission
    const handleSubmit = () => {
        if (title && url && id && content && price && category) {
            onUpdateItem(id, title, url, price,content, category); // Pass the title and URL to the parent component
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
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter the content"/>
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Enter the price"/>
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