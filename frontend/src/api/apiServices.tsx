import axios from 'axios';
import {Category} from "../pages/Categories/Category.tsx";
export const getCategories = async () => {
    try {
        const response = await axios.get('http://localhost:4000/categories');
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const deleteCategory = async (id: string, data?: Category[]) => {
    try {
        await axios.delete(`http://localhost:4000/categories/${id}`);
        return (data ?? []).filter((item: Category) => item._id !== id);
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

export const addCategory = async (newCategory: Category, data?:Category[]) => {
    try {
        const response = await axios.post<Category>(
            "http://localhost:4000/categories",
            newCategory
        );
        return [...(data || []), response.data];
    } catch (error) {
        console.error("Error adding new category:", error);
        throw error;
    }
};

export const updateCategory = async (categoryId: string, updatedCategory: Category, data?: Category[]) => {
    try {
        const response = await axios.put<Category>(
            `http://localhost:4000/categories/${categoryId}`,
            updatedCategory
        );
        return (data || []).map((cat:Category) => (cat._id === categoryId ? response.data : cat));
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};
