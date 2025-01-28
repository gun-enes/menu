// 📂 hooks/useFetch.js
import { useState, useEffect } from "react";
import {getDishesByCategorySlug} from "../api/Dishes.tsx";
import {Dish} from "../pages/Dishes/Dish.tsx";
import axios from "axios";

export default function useFetch(slug: string | undefined)  {
    const [data, setData] = useState<Dish[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dishes = await getDishesByCategorySlug(slug); // Fetch data from the API
                setData(dishes);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const addDish = async (newDish:Dish) => {
        try {
            const response = await axios.post<Dish>(
                `${import.meta.env.VITE_API_URL}/dishes`,
                newDish
            );
            setData((prevData) => [...prevData, response.data]); // Append new dish
        }
        catch (error:any){
            setError(error)
        }
    };

    const updateDish = async (id: string, updatedDish: Dish) => {
        try {
            const response = await axios.put<Dish>(
                `${import.meta.env.VITE_API_URL}/dishes/${id}`,
                updatedDish
            );
            setData((prevData) => prevData.map((dish) => dish._id === id ? response.data : dish)); // Update in state
        } catch (error: any) {
            setError(error);
        }
    }

    const deleteDish = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/dishes/${id}`);
            setData((prevData) => prevData.filter((dish) => dish._id !== id)); // Remove from state
        } catch (err: any) {
            setError(err);
        }
    };

    return { data, loading, error, addDish, updateDish, deleteDish};
};