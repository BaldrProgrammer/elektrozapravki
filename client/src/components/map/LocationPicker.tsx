'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    Alert,
    Snackbar,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import LocationSearch from '../InputEnot/LocationSearch';
import ActionMap from './ActionMap';
import {
    reverseGeocode,
    getBrowserLocation,
    KALININGRAD_CENTER
} from '../../utils/geo/geoUtils';

interface LocationPickerProps {
    onLocationChange?: (lat: number, lng: number, address: string) => void;
    initialLocation?: {
        lat: number;
        lng: number;
        address?: string;
    };
}

const LocationPicker: React.FC<LocationPickerProps> = ({
                                                           onLocationChange,
                                                           initialLocation,
                                                       }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Состояния
    const [mapCenter, setMapCenter] = useState<[number, number]>(() => [
        initialLocation?.lng || KALININGRAD_CENTER.lng,
        initialLocation?.lat || KALININGRAD_CENTER.lat,
    ]);

    const [address, setAddress] = useState(initialLocation?.address || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Синхронизация с initialLocation
    useEffect(() => {
        if (initialLocation) {
            setMapCenter([initialLocation.lng, initialLocation.lat]);
            if (initialLocation.address) {
                setAddress(initialLocation.address);
            }
        }
    }, [initialLocation?.lat, initialLocation?.lng, initialLocation?.address]);

    // Получение адреса при перемещении карты
    const handleMapMove = useCallback(async (lng: number, lat: number) => {
        setIsLoading(true);

        try {
            const result = await reverseGeocode(lat, lng);

            if (result) {
                const newAddress = result.shortName || result.displayName;
                setAddress(newAddress);

                if (onLocationChange) {
                    onLocationChange(lat, lng, newAddress);
                }
            }
        } catch (err) {
            console.error('Ошибка получения адреса:', err);
        } finally {
            setIsLoading(false);
        }
    }, [onLocationChange]);

    // Выбор места из поиска
    const handleLocationSelect = useCallback((lat: number, lng: number, selectedAddress: string) => {
        setMapCenter([lng, lat]);
        setAddress(selectedAddress);

        if (onLocationChange) {
            onLocationChange(lat, lng, selectedAddress);
        }
    }, [onLocationChange]);

    // Использование текущего местоположения
    const handleUseCurrentLocation = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const position = await getBrowserLocation();
            const { latitude, longitude } = position.coords;

            const result = await reverseGeocode(latitude, longitude);

            if (result) {
                const newAddress = result.shortName || result.displayName;
                setMapCenter([longitude, latitude]);
                setAddress(newAddress);

                if (onLocationChange) {
                    onLocationChange(latitude, longitude, newAddress);
                }
            }
        } catch (err) {
            console.error('Ошибка получения местоположения:', err);
            setError('Не удалось определить ваше местоположение');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    }, [onLocationChange]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >

            {/* Карта */}
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    position: 'relative',
                    borderRadius: { xs: 2, sm: 3 },
                    overflow: 'hidden',
                }}
            >
                <ActionMap
                    center={mapCenter}
                    onMapMove={handleMapMove}
                    interactive={true}
                    showGeoButton={false}
                />
            </Box>

            {/* Уведомление об ошибке */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LocationPicker;