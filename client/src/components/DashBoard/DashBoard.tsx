'use client'

import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useMediaQuery} from "@mui/material";
import StationSearchForm from "@/components/Forms/StationSearchForm";

export default function DashBoard() {
    const [open, setOpen] = useState(true);
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

                    height: isMobile ? '70vh' : 480,

                    transform: open
                        ? 'translateY(0)'
                        : isMobile
                            ? 'translateY(100%)'
                            : 'translateY(100%)',

                    transition: 'transform 0.35s ease',
                    zIndex: 999,
                    background:'rgba(255,255,255,0.83)',
                    backdropFilter: 'blur(14px)',
                    borderTopLeftRadius: 44,
                    borderTopRightRadius: 44,

                    p: isMobile ? 2 : 3,
                    pt:5,

                    overflowY: 'auto',
                }}
            >
                <Typography variant="h3" sx={{ mb: 4, textAlign:'center'}}>
                    Поиск электростанции
                </Typography>

                <StationSearchForm/>
            </Box>
        </>
    );
}