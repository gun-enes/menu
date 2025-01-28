// 📂 hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getCategories } from "../api/Categories.tsx";
import { Category } from "../pages/Categories/Category.tsx";

export default function useFetch()  {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await getCategories(); // Fetch data from the API
                setData(categories);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addCategory = async (newCategory: Category) => {
        try {
            const response = await axios.post<Category>(
                `${import.meta.env.VITE_API_URL}/categories`,
                newCategory
            );
            setData((prevData) => [...prevData, response.data]); // Append new category
        }
        catch (error:any){
            setError(error)
        }
    };

    const updateCategory = async (id: string, updatedCategory: Category) => {
        try {
            const response = await axios.put<Category>(
                `${import.meta.env.VITE_API_URL}/categories/${id}`,
                updatedCategory
            );
            setData((prevData) => prevData.map((category) => category._id === id ? response.data : category)); // Update in state
        } catch (error: any) {
            setError(error);
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
            setData((prevData) => prevData.filter((category) => category._id !== id)); // Remove from state
        } catch (err: any) {
            setError(err);
        }
    };

    return { data, loading, error, addCategory, updateCategory, deleteCategory};
};