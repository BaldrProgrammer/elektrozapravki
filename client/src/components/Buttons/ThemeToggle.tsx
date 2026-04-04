'use client';

import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useThemeContext } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { mode, toggleTheme, isMounted } = useThemeContext();
    const theme = useTheme();

    return (
        <Tooltip
            title={isMounted ? (mode === 'light' ? 'Темная тема' : 'Светлая тема') : 'Загрузка...'}
        >
            <IconButton
                onClick={isMounted ? toggleTheme : undefined}
                sx={{
                    borderRadius: 2,
                    backgroundColor: isMounted && mode === 'light'
                        ? 'rgba(0, 0, 0, 0.05)'
                        : isMounted && mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'transparent',
                    '&:hover': {
                        backgroundColor: isMounted && mode === 'light'
                            ? 'rgba(0, 0, 0, 0.1)'
                            : isMounted && mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.12)'
                                : 'transparent',
                    },
                    transition: 'all 0.2s ease',
                    opacity: isMounted ? 1 : 0.5,
                }}
                disabled={!isMounted}
            >
                {isMounted && mode === 'light' ? (
                    <ModeNightIcon sx={{ color: theme.palette.primary.main }} />
                ) : (
                    <LightModeIcon sx={{ color: theme.palette.primary.main }} />
                )}
            </IconButton>
        </Tooltip>
    );
};