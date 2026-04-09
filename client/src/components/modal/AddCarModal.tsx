'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Typography,
    Button,
    Stack,
    Modal,
} from '@mui/material';
import { useTheme } from '@mui/material';

interface AddCarModalProps {
    open: boolean;
    onClose: () => void;
}

const cars = [
    { label: 'Tesla Model 3', battery: 60, range: 491 },
    { label: 'Tesla Model S', battery: 100, range: 652 },
    { label: 'Nissan Leaf', battery: 40, range: 270 },
    { label: 'BMW i3', battery: 42, range: 260 },
];

export default function AddCarModal({ open, onClose }: AddCarModalProps) {
    const theme = useTheme();

    const [selectedCar, setSelectedCar] = useState('');
    const [battery, setBattery] = useState('');
    const [range, setRange] = useState('');

    const handleSelect = (value: string) => {
        setSelectedCar(value);

        const car = cars.find((c) => c.label === value);
        if (car) {
            setBattery(String(car.battery));
            setRange(String(car.range));
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    width: '90%',
                    maxWidth: 420,
                    p: 3,
                    borderRadius: 2,

                    background:
                        theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(255,255,255,0.95)',

                    backdropFilter: 'blur(20px)',
                }}
            >
                <Typography variant="h6" mb={2}>
                    Добавить электро бибику
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        select
                        label="Модель"
                        value={selectedCar}
                        onChange={(e) => handleSelect(e.target.value)}
                        fullWidth
                    >
                        {cars.map((car) => (
                            <MenuItem key={car.label} value={car.label}>
                                {car.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Батарея (кВт⋅ч)"
                        value={battery}
                        onChange={(e) => setBattery(e.target.value)}
                        type="number"
                        fullWidth
                    />

                    <TextField
                        label="Запас хода (км)"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        type="number"
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{ borderRadius: '999px' }}
                    >
                        Сохранить
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}