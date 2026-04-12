
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import { createRoot } from 'react-dom/client';
import CustomMarker from './CustomMarker';
import CustomMarkerAZS from "@/components/map/CustomMarkerAZS";
import { osmConfig } from './osmConfig';
import CustomZoomButtons from '../Buttons/CustomZoomButtons';
import { KALININGRAD_CENTER } from '@/utils/geo/geoUtils';
import {IStations} from "@/types/MapType";
import type {FeatureCollection, Point} from "geojson";
import StationCard from "@/components/Card/StationCard";


interface IActionMapProps {
    center?: [number, number];
    onMapMove?: (lng: number, lat: number) => void;
    onMapLoad?: (map: maplibregl.Map) => void;
    markerColor?: string;
    interactive?: boolean;

    stations: IStations[];

}

const ActionMap: React.FC<IActionMapProps> = ({
                                                  center,
                                                  onMapMove,
                                                  onMapLoad,
                                                  stations,
                                                  markerColor = '#1A1A1A',
                                                  interactive = true,
                                              }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const mapContainer = useRef<HTMLDivElement>(null);
    // мапРеф это копия карты из библиотеки MapLibre GL JS
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<HTMLDivElement | null>(null);
    const stationsMarkersRef = useRef<maplibregl.Marker[]>([]);
    const rootRef = useRef<any>(null);
    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const moveTimeout = useRef<NodeJS.Timeout | null>(null);

    const[selectStation, setSelectStation] = useState<IStations | null>(null);

    const [cardPosition, setCardPosition] = useState<{ x: number; y: number } | null>(null);



    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        const initialCenter = center || [KALININGRAD_CENTER.lng, KALININGRAD_CENTER.lat];

        try {
            const map = new maplibregl.Map({
                container: mapContainer.current,
                style: osmConfig.style,
                center: initialCenter as [number, number],
                zoom: 15,
                maxZoom: osmConfig.maxZoom || 18,
                minZoom: osmConfig.minZoom || 10,
                attributionControl: osmConfig.attributionControl || false,
                interactive: interactive,
            });

            mapRef.current = map;

            map.on('load', () => {
                setMapReady(true);
                setMapError(null);
                if (onMapLoad) {
                    onMapLoad(map);
                }
            });

            map.on('error', (e) => {
                console.error('🗺️ ActionMap - map error:', e);
                setMapError('Ошибка загрузки карты');
            });

        } catch (error) {
            console.error('🗺️ ActionMap - error creating map:', error);
            setMapError('Ошибка создания карты');
        }

        return () => {
            if (moveTimeout.current) {
                clearTimeout(moveTimeout.current);
            }
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [interactive]);

    // Обработка перемещения карты (только если интерактивная)
    useEffect(() => {
        if (!mapRef.current || !mapReady || !interactive || !onMapMove) return;

        const handleMapMove = () => {
            if (moveTimeout.current) {
                clearTimeout(moveTimeout.current);
            }

            moveTimeout.current = setTimeout(() => {
                if (!mapRef.current || !onMapMove) return;

                const center = mapRef.current.getCenter();
                onMapMove(center.lng, center.lat);
            }, 300);
        };

        mapRef.current.on('move', handleMapMove);
        mapRef.current.on('moveend', handleMapMove);

        return () => {
            if (mapRef.current) {
                mapRef.current.off('move', handleMapMove);
                mapRef.current.off('moveend', handleMapMove);
            }
        };
    }, [mapReady, onMapMove, interactive]);

    // Центрирование карты при изменении center
    useEffect(() => {
        if (!mapRef.current || !mapReady || !center) return;

        // Проверяем, отличается ли новый центр от текущего
        const currentCenter = mapRef.current.getCenter();
        if (currentCenter.lng === center[0] && currentCenter.lat === center[1]) return;

        mapRef.current.setCenter(center);
    }, [center, mapReady]);

    useEffect(() => {
        if (!mapRef.current || !mapReady || !stations) return;

        const map = mapRef.current;


        stationsMarkersRef.current.forEach((m) => m.remove());
        stationsMarkersRef.current = [];

        stations.forEach((s) => {

            const markerContainer = document.createElement('div');
            markerContainer.style.cursor = 'pointer';

            const root = createRoot(markerContainer);
            root.render(
                <CustomMarkerAZS
                    size={40}
                    color="#0f0a2a"
                    pulse={true}
                />
            );

            markerContainer.onclick = (e) => {
                e.stopPropagation();
                setSelectStation(s);
            };

            const marker = new maplibregl.Marker({
                element: markerContainer,
                anchor: 'center',
            })
                .setLngLat([s.x, s.y])
                .addTo(map);


            stationsMarkersRef.current.push(marker);
        });

    }, [stations, mapReady]);

    useEffect(() => {
        if (!mapRef.current) return;

        const handleMapClick = () => {
            setSelectStation(null);
        };

        mapRef.current.on('click', handleMapClick);

        return () => {
            mapRef.current?.off('click', handleMapClick);
        };
    }, [mapReady]);

    const handleZoomIn = () => {
        if (mapRef.current) {
            mapRef.current.zoomIn();
        }
    };

    // шобы карточка рендорилась рядом с точкой
    useEffect(() => {
        if (!mapRef.current || !selectStation) return;

        const updatePosition = () => {
            const map = mapRef.current!;
            const point = map.project([selectStation.x, selectStation.y]);

            setCardPosition({
                x: point.x,
                y: point.y,
            });
        };

        updatePosition();

        // шобы карточка двигалась при зуме карты
        mapRef.current.on('move', updatePosition);

        return () => {
            mapRef.current?.off('move', updatePosition);
        };
    }, [selectStation]);

    const handleZoomOut = () => {
        if (mapRef.current) {
            mapRef.current.zoomOut();
        }
    };

    navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords
    })

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Box
                ref={mapContainer}
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: { xs: '24px', sm: '28px', md: '32px' },
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#f0f0f0',
                }}
            />
            {!mapReady && !mapError && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 5,
                    }}
                >
                    Загрузка карты...
                </Box>
            )}
            {mapError && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        zIndex: 5,
                        color: 'error.main',
                    }}
                >
                    {mapError}
                </Box>
            )}
            {mapReady && interactive && (
                <CustomZoomButtons
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                />
            )}
            {selectStation && cardPosition && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: cardPosition.y,
                        left: cardPosition.x,
                        transform: 'translate(-50%, -120%)',
                        zIndex: 10,
                        pointerEvents: 'auto',
                        animation: 'fadeIn 0.3s ease',
                    }}
                >
                    <StationCard
                        vt={selectStation.power}
                        price={selectStation.price}
                        connector={selectStation.connector}
                        address={selectStation.address}
                        Net={selectStation.network}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ActionMap;