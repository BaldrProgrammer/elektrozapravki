'use client';

import { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { osmConfig } from "@/components/map/osmConfig";

export default function useMap(center?: [number, number]) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const m = new maplibregl.Map({
            container: containerRef.current,
            style: osmConfig.style,
            center: center || [0, 0],
            zoom: 15,
        });

        setMap(m);

        m.on("load", () => {
            setMapReady(true);
        });

        m.on("error", () => {
            setMapError("Ошибка карты");
        });

        return () => {
            m.remove();
            setMap(null);
        };
    }, [center]);

    return {
        map,
        containerRef,
        mapReady,
        mapError,
    };
}