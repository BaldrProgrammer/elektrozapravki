'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation'; // добавьте иконку
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import { createRoot } from 'react-dom/client';
import CustomMarker from './CustomMarker';
import CustomMarkerAZS from "@/components/map/CustomMarkerAZS";
import { osmConfig } from './osmConfig';
import CustomZoomButtons from '../Buttons/CustomZoomButtons';
import { KALININGRAD_CENTER, getBrowserLocation } from '@/utils/geo/geoUtils';
import {IStation} from "@/types/StationsType";
import StationCard from "@/components/Card/StationCard";
import getCords from "@/utils/getCords";


interface IActionMapProps {
    center?: [number, number];
    onMapMove?: (lng: number, lat: number) => void;
    onMapLoad?: (map: maplibregl.Map) => void;
    markerColor?: string;
    interactive?: boolean;
    data: IStation[];
    showGeolocation?: boolean;
}

const ActionMap: React.FC<IActionMapProps> = ({
                                                  center,
                                                  onMapMove,
                                                  onMapLoad,
                                                  data,
                                                  markerColor = '#1A1A1A',
                                                  interactive = true,
                                                  showGeolocation = true, // по умолчанию показываем
                                              }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));


    const mapContainer = useRef<HTMLDivElement>(null);
    const geolocationMarkerRef = useRef<maplibregl.Marker | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const stationsMarkersRef = useRef<maplibregl.Marker[]>([]);
    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const moveTimeout = useRef<NodeJS.Timeout | null>(null);
    const [selectStation, setSelectStation] = useState<IStation | null>(null);
    const [isLocating, setIsLocating] = useState(false);


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
                attributionControl: false,
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
                console.error('ActionMap - map error:', e);
                setMapError('Ошибка загрузки карты');
            });

        } catch (error) {
            console.error('ActionMap - error creating map:', error);
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
        if (!mapRef.current || !mapReady || !data) return;

        const map = mapRef.current;


        stationsMarkersRef.current.forEach((m) => m.remove());
        stationsMarkersRef.current = [];

        data.forEach((s) => {
            const coords = getCords(s.cords)

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

                if (mapRef.current) {
                    mapRef.current.easeTo({
                        center: coords,
                        duration: 800,
                        zoom: 15,

                        offset: [0, -150],
                    });
                }

                setSelectStation(s);
            };

            const marker = new maplibregl.Marker({
                element: markerContainer,
                anchor: 'center',
            })
                .setLngLat(coords)
                .addTo(map);


            stationsMarkersRef.current.push(marker);
        });

    }, [data, mapReady]);

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



    const handleZoomOut = () => {
        if (mapRef.current) {
            mapRef.current.zoomOut();
        }
    };

    // функция с гео и еще отрисовывает маркер
    const handleGeolocation = useCallback(async () => {
        if (!mapRef.current || !mapReady) return;

        setIsLocating(true);

        try {
            const position = await getBrowserLocation();
            const { latitude, longitude } = position.coords;

            mapRef.current.easeTo({
                center: [longitude, latitude],
                duration: 1000,
                zoom: 15
            });


            if (geolocationMarkerRef.current) {
                geolocationMarkerRef.current.remove();
            }

            const markerContainer = document.createElement('div');
            markerContainer.style.cursor = 'pointer';
            markerContainer.style.zIndex = '10';


            const root = createRoot(markerContainer);
            root.render(
                <CustomMarker
                    size={40}
                    color="#221278"
                />
            );


            const geolocationMarker = new maplibregl.Marker({
                element: markerContainer,
                anchor: 'center',
            })
                .setLngLat([longitude, latitude])
                .addTo(mapRef.current);


            geolocationMarkerRef.current = geolocationMarker;

            console.log('Геолокация успешна:', { latitude, longitude });


        } catch (error) {
            console.error('Ошибка геолокации:', error);
        } finally {
            setIsLocating(false);
        }
    }, [mapReady]);

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

            {mapReady && interactive && (
                <CustomZoomButtons
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                />
            )}


            {mapReady && showGeolocation && (
                <IconButton
                    onClick={handleGeolocation}
                    disabled={isLocating}
                    sx={{
                        position: 'absolute',
                        top: 66,
                        right: 11,
                        backgroundColor: 'white',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        zIndex: 1000,
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                        '&:disabled': {
                            backgroundColor: '#e0e0e0',
                        }
                    }}
                >
                    <MyLocationIcon sx={{ color: '#1A1A1A' }} />
                </IconButton>
            )}


            {selectStation && (
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 20,

                        transform: selectStation ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.3s ease',

                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: 'auto',

                        animation: 'slideUp 0.3s ease',

                        '@keyframes slideUp': {
                            from: { transform: 'translateY(40px)', opacity: 0 },
                            to: { transform: 'translateY(0)', opacity: 1 },
                        },
                    }}
                >
                    <StationCard
                        name={selectStation.name}
                        price={selectStation.price}
                        address={selectStation.address}
                        opening_hours={selectStation.opening_hours}
                        websites={selectStation.websites}
                        characteristics={selectStation.characteristics}
                        cords={selectStation.cords}
                        timezone={selectStation.timezone}
                        phone_numbers={selectStation.phone_numbers}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ActionMap;