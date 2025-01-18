interface NavbarProps {
    title: string | undefined;
}

export default function Navbar({ title }: NavbarProps) {
    return (
        <nav style={{
            background: 'linear-gradient(90deg, #f1356d, #e91e63)', // Gradient background
            padding: '20px 40px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <h1 style={{
                            color: 'white',
                            margin: 0,
                            fontSize: '2rem', // Slightly larger font size
                            fontWeight: 'bold',
                        }}>
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </nav>
    );
}