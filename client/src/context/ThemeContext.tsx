'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/theme/theme';
import { useParams } from 'next/navigation';
import { ruRU, enUS } from '@mui/material/locale';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
    isMounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeContextProvider');
    }
    return context;
};

interface IThemeContextProviderProps {
    children: ReactNode;
}

const getInitialTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null;
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme;
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    return 'dark';
};

const getMuiLocale = (locale: string) => {
    switch (locale) {
        case 'ru':
            return ruRU;
        case 'en':
            return enUS;
        default:
            return ruRU;
    }
};

export const ThemeContextProvider: React.FC<IThemeContextProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(getInitialTheme);
    const [isMounted, setIsMounted] = useState(false);

    let locale = 'en';
    try {
        const params = useParams();
        locale = (params?.locale as string) || 'en';
    } catch (error) {
        console.warn('useParams not available, using default locale "en"');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme-mode', newMode);
            return newMode;
        });
    };

    const setTheme = (newMode: ThemeMode) => {
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
    };

    const baseTheme = mode === 'light' ? lightTheme : darkTheme;

    const themeWithLocale = {
        ...baseTheme,
        ...getMuiLocale(locale),
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, setTheme, isMounted }}>
            <MuiThemeProvider theme={themeWithLocale}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};