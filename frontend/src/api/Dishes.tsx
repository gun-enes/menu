import axios from 'axios';
import {Dish} from "../models/Dish.tsx";

export const getDishes = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dishes/`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error("Error fetching dishes:", error);
        throw error;
    }
};

export const getDishesByCategory = async (categoryId?: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dishes/category`, {
            params: {
                category: categoryId, // Pass the category as a query parameter
            },
        });
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching dishes:', error);
        throw error;
    }
};

export const getDishesByCategorySlug = async (slug?: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dishes/category/slug`, {
            params: {
                slug: slug, // Pass the slug as a query parameter
            },
        });
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching dishes:', error);
        throw error;
    }
}
export const getDish = async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dishes/${id}`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error("Error fetching dish:", error);
        throw error;
    }
}

export const updateDish = async (dishId: string, updatedDish: Dish, data?: Dish[],) => {
    try {
        const response = await axios.put<Dish>(
            `${import.meta.env.VITE_API_URL}/dishes/${dishId}`,
            updatedDish
        );
        return (data || []).map((dish:Dish) => (dish._id === dishId ? response.data : dish));
    } catch (error) {
        console.error("Error updating dish:", error);
        throw error;
    }
}

export const addDish = async (newDish: Dish, data?:Dish[]) => {
    try {
        const response = await axios.post<Dish>(
            `${import.meta.env.VITE_API_URL}/dishes`,
            newDish
        );
        return [...(data || []), response.data];
    } catch (error) {
        console.error("Error adding new dish:", error);
        throw error;
    }
};

export const deleteDish = async (id: string, data?: Dish[]) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/dishes/${id}`);
        return (data ?? []).filter((item: Dish) => item._id !== id);
    } catch (error) {
        console.error("Error deleting dish:", error);
        throw error;
    }
};

