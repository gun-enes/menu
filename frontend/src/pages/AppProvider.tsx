import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface AppContextType {
    theme: string;
    setTheme: (theme: string) => void;
    header: string;
    setHeader: (header: string) => void;
    arrange: boolean;
    setArrange: (arrange: boolean) => void;
}

// Create the context with an initial value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>("light");
    const [header, setHeader] = useState<string>("Menü");
    const [arrange, setArrange] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{arrange, theme, setTheme, header, setHeader, setArrange }}>
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
