import { useContext, createContext } from 'react';
import {Dish} from "./Dish.tsx";

interface DishContextProps {
    setTitle: (title: string) => void;
    setURL: (url: string) => void;
    setEdit: (edit: boolean) => void
    setData: (data: Dish[]) => void;
    setError: (error: string) => void;
    setPrice: (price: number) => void;
    setContent: (content: string) => void;
    data?: Dish[]
    price: number;
    content: string;
    url: string;
    title: string;
    edit: boolean;
    dishId: string;
    setDishId: (id: string) => void;
}
export const DishContext = createContext<DishContextProps>({} as DishContextProps);

export const useDishContext = () => {
    const context = useContext(DishContext);
    if (!context) {
        throw new Error('useDishContext must be used within a DishProvider');
    }
    return context;
};