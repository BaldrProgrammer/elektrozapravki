'use client'

import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputSt from "@/components/Input/InputSt";
import ButtonStation from "@/components/Buttons/ButtonStation";
import {useMediaQuery} from "@mui/material";

export default function DashBoard() {
    const [open, setOpen] = useState(false);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: open
                        ? isMobile
                            ? 20
                            : 450
                        : 40,
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
                        background: 'rgba(173,139,251,0.51)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(15,10,42,0.77)',
                        transition: 'all 0.3s ease',


                        animation: open ? '' : 'attention 2.5s infinite',

                        '@keyframes attention': open ? '' : {
                            '0%': {
                                transform: 'translateY(0) scale(1)',
                                background: 'rgba(173,139,251,0.51)',
                            },
                            '30%': {
                                transform: 'translateY(-6px) scale(1.05)',
                                background: 'rgba(173,139,251,0.62)',
                            },
                            '60%': {
                                transform: 'translateY(0) scale(1)',
                                background: 'rgba(173,139,251,0.8)',
                            },
                            '100%': {
                                transform: 'translateY(0) scale(1)',
                                background: 'rgba(173,139,251,0.66)',
                            },
                        },
                        '&:hover': {
                            transform: 'translateY(-4px) scale(1.08)',
                        },
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

                    height: isMobile ? '100vh' : 440,

                    transform: open
                        ? 'translateY(0)'
                        : isMobile
                            ? 'translateY(100%)'
                            : 'translateY(100%)',

                    transition: 'transform 0.35s ease',

                    zIndex: 999,

                    backdropFilter: 'blur(20px)',
                    background: theme.components?.MuiPaper,
                    borderTop: '1px solid rgba(173, 139, 251, 0.2)',

                    borderTopLeftRadius: isMobile ? 0 : '20px',
                    borderTopRightRadius: isMobile ? 0 : '20px',

                    p: isMobile ? 2 : 3,

                    overflowY: 'auto',
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

                <Typography variant="h3" sx={{ mb: 2, }}>
                    Поиск электростанции
                </Typography>

                <Box sx={{ display: 'flex',
                    justifyContent:isMobile ? '':'start',
                    flexDirection:isMobile ? 'column':'',
                    width:'80%',
                    m:'0 auto',
                    p:2,
                    height:isMobile ? '40%' : 180,
                    gap: 2,
                    background:'rgba(255,255,255,0.18)',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                }}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                        <InputSt label="Уровень заряда" sx={{width:250 , m: isMobile ? '0 auto':''}}/>
                        <InputSt label="Коннектор" sx={{width:250 , m: isMobile ? '0 auto':''}}/>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                        <InputSt label="Мощность" sx={{width:250 , m: isMobile ? '0 auto':''}}/>
                        <InputSt label="Запас хода" sx={{width:250 , m: isMobile ? '0 auto':''}}/>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', width:'100%', mt: 2,}}>
                    <ButtonStation>Найти станцию</ButtonStation>
                </Box>
            </Box>
        </>
    );
}