import { useContext, createContext } from 'react';
import {Category} from "./Category.tsx";

interface CategoryContextProps {
    setTitle: (title: string) => void;
    setURL: (url: string) => void;
    setEdit: (edit: boolean) => void
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