import { useContext, createContext } from 'react';
import {Category} from "./Category.tsx";

interface CategoryContextProps {
    setData: (data: Category[]) => void;
    setError: (error: string) => void;
    data?: Category[]
}
export const CategoryContext = createContext<CategoryContextProps>({} as CategoryContextProps);

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context;
};