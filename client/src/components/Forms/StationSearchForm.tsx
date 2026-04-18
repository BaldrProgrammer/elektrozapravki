'use client';

import React, { useState } from 'react';
import { Box, Switch, FormControlLabel, Typography, useTheme, useMediaQuery } from '@mui/material';
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
}

export default function StationSearchForm({ onSubmit, initialValues }: StationSearchFormProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [useAutoGeo, setUseAutoGeo] = useState(true);

    const [filters, setFilters] = useState<SearchFilters>({
        chargeLevel: initialValues?.chargeLevel || '',
        connector: initialValues?.connector || '',
        power: initialValues?.power || '',
        range: initialValues?.range || '',
    });

    const handleChange = (field: keyof SearchFilters) => (value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit?.(filters);
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
                    height: isMobile ? 'auto' : 180,
                    gap: 2,
                    background: 'rgba(255,255,255,0.18)',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <InputSt
                        label="Уровень заряда"
                        value={filters.chargeLevel}
                        onChange={(e) => handleChange('chargeLevel')(e.target.value)}
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />
                    <InputSt
                        label="Коннектор"
                        value={filters.connector}
                        onChange={(e) => handleChange('connector')(e.target.value)}
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <InputSt
                        label="Мощность"
                        value={filters.power}
                        onChange={(e) => handleChange('power')(e.target.value)}
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />
                    <InputSt
                        label="Запас хода"
                        value={filters.range}
                        onChange={(e) => handleChange('range')(e.target.value)}
                        sx={{ width: 270, m: isMobile ? '0 auto' : '' }}
                    />
                </Box>
                <Box sx={{display:'flex'}}>
                    <Box sx={{ mb: 1 }}>
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
                    </Box>

                    <Box>
                        <InputSt
                            label="lat"
                            sx={{ width: 100 }}
                        />
                        <InputSt
                            label="lon"
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