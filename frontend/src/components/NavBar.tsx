import { useAppContext } from "../pages/AppProvider";
import {useLocation} from "react-router-dom";


export default function Navbar() {
    const { header, setHeader } = useAppContext(); // Get header from context
    const location = useLocation();

    const handleGoBack = () => {
        window.history.back(); // Navigate to the previous page in history
    };
    if(location.pathname === "/"){
        setHeader("Menü");
    }

    return (
        <nav style={{
            background: 'linear-gradient(90deg, #f1356d, #e91e63)',
            padding: '20px 5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <div className="container">
                <div className="row align-items-start">
                        <div className="d-flex">
                            {window.location.pathname !== "/" ? (
                            <button
                                onClick={handleGoBack}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                    transition: "background 0.2s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 18l-6-6 6-6"/>
                                </svg>
                            </button>
                            ) : null}

                            <h1 style={{
                                color: 'white',
                                margin: 0,
                                fontSize: '2rem',
                                fontWeight: 'bold',
                            }}>
                                {header}
                            </h1>
                    </div>
                </div>
            </div>
        </nav>
    );
}
