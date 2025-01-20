interface ErrorPageProps {
    errorMessage?: string;
}

export default function ErrorPage({ errorMessage }: ErrorPageProps) {
    return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#ffe6e6",
                color: "#cc0000",
            }}>
                <h1>Oops! Something went wrong.</h1>
                <p>{errorMessage || "Please try again later."}</p>
                {/* You can add a button to retry or go back */}
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
    );
};