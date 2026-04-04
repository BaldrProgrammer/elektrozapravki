'use client';

import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import AddCarModal from "@/components/modal/AddCarModal";
import CardCard from "@/components/Card/CarCard";

export default function AddCar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [carName, setCarName] = useState('');

    return (
        <Box
            sx={{
                width: '100%',
                height: 400,
                borderRadius: 2,
                p: 2,
                background:
                    theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(173,139,251,0.27)',
            }}
        >
            <Box>
                {/* Карточка машины */}
                <CardCard nameCar={carName} />

                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{ borderRadius: '999px', mt: 2 }}
                >
                    Добавить авто
                </Button>
            </Box>

            {/* Модалка */}
            <AddCarModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={(name) => setCarName(name)}
            />
        </Box>
    );
}