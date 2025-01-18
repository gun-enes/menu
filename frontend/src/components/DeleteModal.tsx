import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'; // Using Material-UI for modern components

interface ConfirmationModalProps {
    open: boolean; // Controls whether the modal is open
    onClose: () => void; // Function to close the modal
    onConfirm: () => void; // Function to handle the delete action
}

export default function ConfirmationModal({ open, onClose, onConfirm }: ConfirmationModalProps) {
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
                Confirm Deletion
            </DialogTitle>

            {/* Modal Content */}
            <DialogContent style={{ padding: '16px 24px', textAlign: 'center' }}>
                <Typography variant="body1" style={{ color: '#666' }}>
                    Are you sure you want to delete?
                </Typography>
            </DialogContent>

            {/* Modal Actions */}
            <DialogActions style={{ padding: '16px 24px', justifyContent: 'center' }}>
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
                    onClick={onConfirm}
                    variant="contained"
                    style={{
                        backgroundColor: '#f1356d',
                        color: 'white',
                        borderRadius: '12px', // Rounded corners for the button
                        padding: '8px 20px', // Adjusted padding
                        textTransform: 'none', // Prevent uppercase
                        boxShadow: 'none', // Remove default shadow
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}