import { useAppContext } from "../pages/AppProvider";
import { useLocation } from "react-router-dom";
import {getCategoryBySlug} from "../api/Categories.tsx";

export default function Navbar() {
    const { header, setHeader, arrange, setArrange } = useAppContext(); // Added arrange to context
    const location = useLocation();

    const handleGoBack = () => {
        window.history.back();
    };

    if (location.pathname === "/") {
        setHeader("Menü");
    }
    else{
        getCategoryBySlug(location.pathname.replace("/", "")).then((category) => {
            setHeader(category.title);
        });
    }

    return (
        <nav style={{
            background: 'linear-gradient(90deg, #f1356d, #e91e63)',
            padding: '20px 5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <div className="container">
                <div className="row align-items-start">
                    <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center">
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
                                marginLeft: '10px'
                            }}>
                                {header}
                            </h1>
                        </div>

                        {location.pathname === "/" && (
                            <div className="d-flex align-items-center">
                                <label style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'white', marginRight: '8px' }}>Arrange</span>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="checkbox"
                                            checked={arrange} // Add checked prop
                                            onChange={() => setArrange(!arrange)} // Add onChange event
                                            style={{
                                                opacity: 0,
                                                width: 0,
                                                height: 0,
                                                position: 'absolute'
                                            }}
                                        />
                                        <div style={{
                                            width: '40px',
                                            height: '24px',
                                            backgroundColor: arrange ? '#ffffff80' : 'rgba(255, 255, 255, 0.3)',
                                            borderRadius: '12px',
                                            position: 'relative',
                                            transition: 'background-color 0.2s',
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '2px',
                                                left: arrange ? '18px' : '2px', // Animate based on state
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                transition: 'left 0.2s',
                                            }} />
                                        </div>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}