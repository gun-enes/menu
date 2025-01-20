import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface AppContextType {
    theme: string;
    setTheme: (theme: string) => void;
    header: string;
    setHeader: (header: string) => void;
}

// Create the context with an initial value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>("light");
    const [header, setHeader] = useState<string>("Menü");

    return (
        <AppContext.Provider value={{ theme, setTheme, header, setHeader }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for using the context
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
