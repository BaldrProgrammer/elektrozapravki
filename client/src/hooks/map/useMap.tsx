'use client'
import {useState, useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import {osmConfig} from "@/components/map/osmConfig";


export default function useMap(center?:[number, number]){
    const mapRef = useRef<maplibregl.Map | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [mapReady, setMapReady] = useState(false)
    const [mapError, setMapError] = useState<string | null>(null)

    useEffect(() => {
        if (!containerRef.current || !mapRef.current) return

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: osmConfig.style,
            center,
            zoom:15,
        });

        mapRef.current = map

        map.on("load", () => setMapReady(true))
        map.on('error', () => setMapError('Ошибка карты'))

        return () => {
            map.remove()
            mapRef.current = null
        };
    }, []);

    return{
        map: mapRef.current,
        containerRef,
        mapReady,
        mapError,
    }
}