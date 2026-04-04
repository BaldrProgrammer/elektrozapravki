'use client';

import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';

interface CarProps {
    name: string;
    battery: string;
    range: string;
}

export default function ListCar({ name, battery, range }: CarProps) {
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 3,
                mb: 2,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Typography variant="h6" fontWeight={600} mb={1}>
                {name || 'Машина не выбрана'}
            </Typography>

            <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                    <Typography color="text.secondary">Батарея:</Typography>
                    <Typography>{battery ? `${battery} кВт⋅ч` : '-'}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography color="text.secondary">Запас хода:</Typography>
                    <Typography>{range ? `${range} км` : '-'}</Typography>
                </Box>
            </Stack>
        </Paper>
    );
}