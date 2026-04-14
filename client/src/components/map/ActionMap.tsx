'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import { createRoot } from 'react-dom/client';
import CustomMarker from './CustomMarker';
import CustomMarkerAZS from "@/components/map/CustomMarkerAZS";
import MapContainer from "@/components/map/MapContainer";
import CustomZoomButtons from '../Buttons/CustomZoomButtons';
import { KALININGRAD_CENTER } from '@/utils/geo/geoUtils';
import {IStations} from "@/types/MapType";
import type {FeatureCollection, Point} from "geojson";
import StationCard from "@/components/Card/StationCard";
import useMap from "@/hooks/map/useMap";


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

    const { map, mapReady, mapError, containerRef } = useMap(center)

    const[selectStation, setSelectStation] = useState<IStations | null>(null);





    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer containerRef={containerRef}/>
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