import axios from 'axios';
import {Category} from "../pages/Categories/Category.tsx";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};


export const getCategoryBySlug = async (slug?: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/slug/${slug}`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const getCategoryById = async (id?: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
}

export const deleteCategory = async (id: string, data?: Category[]) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
        return (data ?? []).filter((item: Category) => item._id !== id);
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

export const addCategory = async (newCategory: Category, data?:Category[]) => {
    try {
        const response = await axios.post<Category>(
            `${import.meta.env.VITE_API_URL}/categories`,
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
            `${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
            updatedCategory
        );
        return (data || []).map((cat:Category) => (cat._id === categoryId ? response.data : cat));
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

