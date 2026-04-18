'use client'
import {useEffect, useState} from "react";
import {IStation} from "@/types/StationsType";
import {IStationNear} from "@/types/StationsType";

export default function useNeareStation({kwt, type, cords}: IStationNear) {
    const [station, setStation] = useState<IStation>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStation = async () => {
            try {
                setLoading(true);
                setError(null);



                const response = await fetch('http://155.212.210.60:8000/stations/get_all_stations_stations_by_filters_get', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        kwt: kwt,
                        type: type,
                        cords: cords
                    })
                });

                if (!response.ok) {
                    throw new Error(`Ошибка запроса! status: ${response.status}`);
                }

                const result = await response.json();
                setStation(result);
            }
            catch (err: any) {
                console.error('Ошибка при запросе:', err);
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchStation();
    }, [kwt, type, cords]);

    return {
        error,
        loading,
        station
    }
}