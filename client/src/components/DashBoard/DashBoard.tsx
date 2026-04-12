'use client'

import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputSt from "@/components/Input/InputSt";

export default function DashBoard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: open ? 320 : 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    transition: '0.3s',
                }}
            >
                <IconButton
                    onClick={() => setOpen(prev => !prev)}
                    sx={{
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                    }}
                >
                    {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </IconButton>
            </Box>

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 320,

                    transform: open ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.35s ease',

                    zIndex: 999,

                    backdropFilter: 'blur(20px)',
                    background: 'rgba(15, 10, 42, 0.75)',
                    borderTop: '1px solid rgba(173, 139, 251, 0.2)',

                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',

                    p: 3,
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 4,
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.3)',
                        mx: 'auto',
                        mb: 2,
                    }}
                />

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Фильтры
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <InputSt placeholder="Какой процент заряда?" />
                    <InputSt placeholder="Коннектор?" />
                    <InputSt placeholder="Мощность" />
                </Box>
            </Box>
        </>
    );
}