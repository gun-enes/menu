import { useAppContext } from "../pages/AppProvider";

export default function Navbar() {
    const { header } = useAppContext(); // Get header from context

    const handleGoBack = () => {
        window.history.back(); // Navigate to the previous page in history
    };

    return (
        <nav style={{
            background: 'linear-gradient(90deg, #f1356d, #e91e63)',
            padding: '20px 40px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="d-flex">
                            <button
                                onClick={handleGoBack}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "8px",
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

                            <h1 style={{
                                color: 'white',
                                margin: 0,
                                fontSize: '2rem',
                                fontWeight: 'bold',
                            }}>
                                {header} {/* This will now dynamically update */}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
