'use client'
import {useEffect, useState} from "react";
import {IStation} from "@/types/StationsType";
import {IStationNear} from "@/types/StationsType";


export default function useNeareStation(filters: IStationNear) {
    const [station, setStation] = useState<IStation>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [send, setSend] = useState<boolean>(false)

    useEffect(() => {
        const fetchStation = async () => {
            try {
                setLoading(true);
                setError(null);

                const requestBody = {
                    lat: typeof filters.lat === 'string' ? parseFloat(filters.lat) : filters.lat,
                    lon: typeof filters.lon === 'string' ? parseFloat(filters.lon) : filters.lon,
                    filters: {
                        kwt: typeof filters.filters.kwt === 'string' ? parseFloat(filters.filters.kwt) : filters.filters.kwt,
                        type: filters.filters.type
                    }
                };

                const response = await fetch(`http://127.0.0.1:8000/stations/get_thebest_station?filters=${requestBody.filters}lat=${requestBody.lat}&lon=${requestBody.lon}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
        if(send){
            fetchStation();}
    }, [filters.lat, filters.lon, filters.filters.kwt, filters.filters.type]);

    return {
        error,
        loading,
        station,
        setSend
    }
}