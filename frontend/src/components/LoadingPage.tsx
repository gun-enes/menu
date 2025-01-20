export default function LoadingPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f0f0f0",
            }}
        >
            {/* Circular Spinner */}
            <div
                style={{
                    border: "4px solid #f3f3f3", // Light grey border
                    borderTop: "4px solid #3498db", // Blue border for animation
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    animation: "spin 1s linear infinite", // Spin animation
                }}
            ></div>
            <h3>Loading...</h3>
        </div>
    );
}

// Add the spin animation to your global styles or in a CSS file
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);