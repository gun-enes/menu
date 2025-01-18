import {Button} from "@mui/material";
import {useState} from "react";


export interface CustomButtonProps {
    text: string;
    buttonBehaviour: () => void;
    color?: string;
}

export default function CustomButton({text, buttonBehaviour, color}: CustomButtonProps) {
    const [bgColor, setBgColor] = useState(0.2);

    return (
        <Button
            variant="contained"
            onClick={(event)=> {
                event.stopPropagation();
                buttonBehaviour();
            }}
            style={{
                color: 'white',
                backgroundColor: color ? color : 'rgba(255, 255, 255, ' + bgColor + ')', // Transparent background
                borderRadius: '20px',
                textTransform: 'none',
                padding: '8px 20px',
                fontWeight: 'bold',
                boxShadow: 'none',
                transition: 'background-color 0.3s ease', // Smooth transition
            }}
            onMouseOver={() => (setBgColor(0.3))} // Hover effect
            onMouseOut={() => (setBgColor(0.2))} // Reset on mouse out
        >
            {text.toUpperCase()}
        </Button>
    );
}