'use client';

import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import AddCarModal from "@/components/modal/AddCarModal";

export default function AddCar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

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

            </Box>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{ borderRadius: '999px' }}
            >
                Добавить авто
            </Button>
            <AddCarModal open={open} onClose={() => setOpen(false)} />
        </Box>
    );
}