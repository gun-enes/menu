import { useContext, createContext } from 'react';
import {Dish} from "./Dish.tsx";

interface DishContextProps {
    setData: (data: Dish[]) => void;
    setError: (error: string) => void;
    data?: Dish[]
}
export const DishContext = createContext<DishContextProps>({} as DishContextProps);

export const useDishContext = () => {
    const context = useContext(DishContext);
    if (!context) {
        throw new Error('useDishContext must be used within a DishProvider');
    }
    return context;
};