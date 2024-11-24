import { useState } from 'react';
import './Modal.css';
import {Button} from "@mui/material";
import {Dish} from "../../pages/Dishes/Dish.tsx";

export interface ModalProps {
    item: Dish;
    handleDeleteDish: (id: string) => void;
}


export default function Modal({item, handleDeleteDish}:ModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={() => {
                    toggleModal();
                }}
                style={{ color: "white", backgroundColor: "red" }}
            >
                Sil
            </Button>
            {isOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Emin misiniz?</h2>
                        <p>Pepperoni Pizza silinecektir</p>
                        <button onClick={()=> {
                            item._id && handleDeleteDish(item._id);
                        }
                        }>Sil</button>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};
