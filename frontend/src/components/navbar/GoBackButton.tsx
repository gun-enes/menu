interface GoBackButtonProps{
    header: string;
    handleGoBack: () => void;
}

export default function GoBackButton({header, handleGoBack}: GoBackButtonProps) {
    return (
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
    )
}




