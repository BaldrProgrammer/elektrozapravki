'use client';

import React, { useState } from 'react';
import { Box, Switch, FormControlLabel, useTheme, useMediaQuery} from '@mui/material';
import InputSt from "@/components/Input/InputSt";
import ButtonStation from "@/components/Buttons/ButtonStation";
import useNeareStation from "@/hooks/useNeareStation";
import {IStationNear} from "@/types/StationsType";
import {IFiltres} from "@/types/StationsType";

interface StationSearchFormProps {
    onSubmit?: (filters: IStationNear) => void;
    initialValues?: Partial<IStationNear>;
}

interface ICord {
    lat: string,
    lon: string
}
interface IFormState {
    lat: string;
    lon: string;
    filters: {
        kwt: string;
        type: string;
    };
}

type AllFields = keyof IStationNear | keyof IFiltres;

export default function StationSearchForm({ onSubmit, initialValues }: StationSearchFormProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [values, setValues] = useState<IFormState>({
        lat: '',
        lon: '',
        filters: { kwt: '', type: '' }
    });
    const [useAutoGeo, setUseAutoGeo] = useState(true);
    const [errors, setErrors] = useState<Partial<Record<AllFields, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<AllFields, boolean>>>({});
    const [filters, setFilters] = useState<IStationNear>({
        lat: initialValues?.lat || '',
        lon: initialValues?.lon || '',
        filters:{
            kwt:initialValues?.filters?.kwt || '',
            type:initialValues?.filters?.type || ''
        },
    });


    const handleChange = (field: AllFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setValues(prev => {
            if (field === 'type' || field === 'kwt') {
                return {
                    ...prev,
                    filters: {
                        ...prev.filters,
                        [field]: value
                    }
                };
            }
            return {
                ...prev,
                [field]: value
            };
        });
    };

    const {setSend, station, error, loading} = useNeareStation(filters)
    console.log(station, 'sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfdsdfsfdsfdsddfsdf')


    const validateField = (field: AllFields, value: string) => {
        let error = '';
        if (field === 'type' && value.trim().length < 2) {
            error = 'Введите корректный тип коннектора';
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
            ? ['type', 'kwt']
            : ['type', 'kwt','lat', 'lon'];

        let isValid = true;
        fieldsToValidate.forEach(field => {
            const fieldKey = field as AllFields;
            let value: string = '';

            if (fieldKey === 'kwt' || fieldKey === 'type') {
                value = (values.filters as any)[fieldKey] || '';
            } else if (fieldKey === 'lat' || fieldKey === 'lon') {
                value = (values as any)[fieldKey] || '';
            }

        const isFieldValid = validateField(fieldKey, value);

            if (!isFieldValid) isValid = false;

            setTouched(prev => ({ ...prev, [fieldKey]: true }));

        });
        return isValid;
    };

    const handleSubmit = () => {
        if (validateAll()) {
            onSubmit?.(filters);
        }
        setSend((prev)=>(!prev))
    };

    const getFieldError = (field: keyof IFiltres) => {
        return touched[field] && errors[field] ? errors[field] : '';
    };
    const getFieldErrorCord = (field: keyof ICord) => {
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
                        value={String(values.filters.type ?? '')}
                        onChange={handleChange('type')}
                        error={!!getFieldError('type')}
                        helperText={getFieldError('type')}
                        required
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <InputSt
                        label="Мощность"
                        value={String(values.filters.kwt ?? '')}
                        onChange={handleChange('kwt')}
                        error={!!getFieldError('kwt')}
                        helperText={getFieldError('kwt')}
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
                            value={String(values.lat ?? '')}
                            onChange={handleChange('lat')}
                            error={!!getFieldErrorCord('lat')}
                            helperText={getFieldErrorCord('lat')}
                            disabled={useAutoGeo}
                            required={!useAutoGeo}
                            sx={{ width: 100 }}
                        />
                        <InputSt
                            label="lon"
                            value={String(values.lon ?? '')}
                            onChange={handleChange('lon')}
                            error={!!getFieldErrorCord('lon')}
                            helperText={getFieldErrorCord('lon')}
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