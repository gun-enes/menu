// 📂 hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Setting } from "../models/Settings.tsx";

export default function SettingsFetch()  {
    const [settings, setSettings] = useState<Setting>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSettingsById = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);
            return response.data;  // Return the fetched data
        } catch (error) {
            console.error("Error fetching category:", error);
            throw error;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const settings = await getSettingsById(); // Fetch data from the API
                setSettings(settings[0]);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addSetting = async (newSetting: Setting) => {
        try {
            await axios.post<Setting>(
                `${import.meta.env.VITE_API_URL}/settings`,
                newSetting
            );
        }
        catch (error:any){
            setError(error)
        }
    };

    const updateSetting = async (id: string, updatedSetting: Setting) => {
        try {
            await axios.put<Setting>(
                `${import.meta.env.VITE_API_URL}/settings/${id}`,
                updatedSetting
            );
            setSettings(updatedSetting); // Update in state
        } catch (error: any) {
            setError(error);
        }
    }

    const deleteSetting = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/settings/${id}`);
        } catch (err: any) {
            setError(err);
        }
    };

    return { settings, loading, error, addSetting, updateSetting, deleteSetting};
};