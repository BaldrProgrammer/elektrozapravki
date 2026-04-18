"use client"

import {useEffect, useState} from "react";
import {IStation} from "@/types/StationsType";

export default function useActionStation() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<IStation[]>([])

    useEffect(() => {
        const fetchStation = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('http://127.0.0.1:8000/stations/all');

                if (!response.ok) {
                    throw new Error(`Шота не то! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            }
            catch (err:any) {
                console.error('Ошибка при запросе:', err);
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchStation();
    }, []);


    return{
        data,
        loading,
        error
    }
}