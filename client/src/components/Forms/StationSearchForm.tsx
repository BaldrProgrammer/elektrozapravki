'use client';

import React, { useState } from 'react';
import { Box, Switch, FormControlLabel, Typography, useTheme, useMediaQuery} from '@mui/material';
import InputSt from "@/components/Input/InputSt";
import ButtonStation from "@/components/Buttons/ButtonStation";

interface StationSearchFormProps {
    onSubmit?: (filters: SearchFilters) => void;
    initialValues?: Partial<SearchFilters>;
}

export interface SearchFilters {
    chargeLevel: string;
    connector: string;
    power: string;
    range: string;
    lat: string;
    lon: string;
}

export default function StationSearchForm({ onSubmit, initialValues }: StationSearchFormProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [useAutoGeo, setUseAutoGeo] = useState(true);
    const [errors, setErrors] = useState<Partial<Record<keyof SearchFilters, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof SearchFilters, boolean>>>({});

    const [filters, setFilters] = useState<SearchFilters>({
        chargeLevel: initialValues?.chargeLevel || '',
        connector: initialValues?.connector || '',
        power: initialValues?.power || '',
        range: initialValues?.range || '',
        lat: initialValues?.lat || '',
        lon: initialValues?.lon || '',
    });

    const handleChange = (field: keyof SearchFilters) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleBlur = (field: keyof SearchFilters) => () => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, filters[field]);
    };

    const validateField = (field: keyof SearchFilters, value: string) => {
        let error = '';
         if (field === 'chargeLevel' && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100)) {
            error = 'Введите число от 0 до 100';
        } else if (field === 'connector' && value.trim().length < 2) {
            error = 'Введите корректный тип коннектора';
        } else if ((field === 'power' || field === 'range') && (isNaN(Number(value)) || Number(value) < 0)) {
            error = 'Введите положительное число';
        } else if (field === 'lat' && (isNaN(Number(value)) || Math.abs(Number(value)) > 90)) {
            error = 'Широта от -90 до 90';
        } else if (field === 'lon' && (isNaN(Number(value)) || Math.abs(Number(value)) > 180)) {
            error = 'Долгота от -180 до 180';
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return !error;
    };

    const validateAll = (): boolean => {
        const fieldsToValidate = useAutoGeo
            ? ['chargeLevel', 'connector', 'power', 'range']
            : ['chargeLevel', 'connector', 'power', 'range', 'lat', 'lon'];

        let isValid = true;
        fieldsToValidate.forEach(field => {
            const fieldKey = field as keyof SearchFilters;
            const isFieldValid = validateField(fieldKey, filters[fieldKey]);
            if (!isFieldValid) isValid = false;
            setTouched(prev => ({ ...prev, [fieldKey]: true }));
        });
        return isValid;
    };

    const handleSubmit = () => {
        if (validateAll()) {
            onSubmit?.(filters);
        }
    };

    const getFieldError = (field: keyof SearchFilters) => {
        return touched[field] && errors[field] ? errors[field] : '';
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: isMobile ? 'center' : 'start',
                    flexDirection: isMobile ? 'column' : 'row',
                    width: '80%',
                    m: '0 auto',
                    p: 2,
                    height: isMobile ? 'auto' : 'auto',
                    gap: 2,
                    background: 'rgba(255,255,255,0.18)',
                    borderRadius: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <InputSt
                        label="Коннектор"
                        value={filters.connector}
                        onChange={handleChange('connector')}
                        onBlur={handleBlur('connector')}
                        error={!!getFieldError('connector')}
                        helperText={getFieldError('connector')}
                        required
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <InputSt
                        label="Мощность"
                        value={filters.power}
                        onChange={handleChange('power')}
                        onBlur={handleBlur('power')}
                        error={!!getFieldError('power')}
                        helperText={getFieldError('power')}
                        required
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />

                </Box>

                <Box sx={{
                    display: 'flex',
                    m:'0 auto',
                    flexDirection: 'column',
                    gap: 1,
                    minWidth: 200,
                }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={useAutoGeo}
                                onChange={(e) => setUseAutoGeo(e.target.checked)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            />
                        }
                        label="Авто геолокация"
                    />

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <InputSt
                            label="lat"
                            value={filters.lat}
                            onChange={handleChange('lat')}
                            onBlur={handleBlur('lat')}
                            error={!!getFieldError('lat')}
                            helperText={getFieldError('lat')}
                            disabled={useAutoGeo}
                            required={!useAutoGeo}
                            sx={{ width: 100 }}
                        />
                        <InputSt
                            label="lon"
                            value={filters.lon}
                            onChange={handleChange('lon')}
                            onBlur={handleBlur('lon')}
                            error={!!getFieldError('lon')}
                            helperText={getFieldError('lon')}
                            disabled={useAutoGeo}
                            required={!useAutoGeo}
                            sx={{ width: 100 }}
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
                <ButtonStation onClick={handleSubmit}>
                    Найти станцию
                </ButtonStation>
            </Box>
        </Box>
    );
}