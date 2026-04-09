'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const colors = {
    dark: {
        background: '#06021d',
        surface: '#0f0a2a',
        surfaceLight: '#1a1240',
        text: '#e8e4ff',
        textSecondary: '#ad8bfb',
        divider: 'rgba(173, 139, 251, 0.2)',
    },
    light: {
        background: '#f6f4ff',
        surface: '#ffffff',
        surfaceLight: '#f0ebff',
        text: '#06021d',
        textSecondary: '#7455f8',
        divider: 'rgba(116, 85, 248, 0.2)',
    },

    primary: '#7455f8',
    primaryLight: '#ad8bfb',
    primarySoft: '#e8e4ff',
};

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,

        primary: {
            main: colors.primary,
            light: colors.primaryLight,
            dark: '#5a3ae0',
            contrastText: colors.dark.text,
        },

        secondary: {
            main: colors.primaryLight,
            light: '#c2a9ff',
            dark: '#8a6cf5',
            contrastText: colors.dark.text,
        },

        background: {
            default: mode === 'dark' ? colors.dark.background : colors.light.background,
            paper: mode === 'dark' ? colors.dark.surface : colors.light.surface,
        },

        text: {
            primary: mode === 'dark' ? colors.dark.text : colors.light.text,
            secondary: mode === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
        },

        divider: mode === 'dark' ? colors.dark.divider : colors.light.divider,
    },

    typography: {
        fontFamily: 'var(--font-inter), sans-serif',

        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${colors.primarySoft}, ${colors.primaryLight})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
        },

        h2: { fontSize: '2rem', fontWeight: 600 },
        h3: { fontSize: '1.75rem', fontWeight: 600 },
        h4: { fontSize: '1.5rem', fontWeight: 600 },
        h5: { fontSize: '1.25rem', fontWeight: 600 },
        h6: { fontSize: '1rem', fontWeight: 600 },

        body1: { fontSize: '1rem' },
        body2: { fontSize: '0.875rem' },

        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 14,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    padding: '10px 24px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                },

                contained: {
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                    boxShadow: `0 0 20px ${colors.primary}55`,

                    '&:hover': {
                        boxShadow: `0 0 30px ${colors.primary}aa`,
                        transform: 'translateY(-2px)',
                    },
                },

                outlined: {
                    borderColor: colors.primary,
                    color: colors.primary,

                    '&:hover': {
                        borderColor: colors.primaryLight,
                        backgroundColor: `${colors.primary}14`,
                    },
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backdropFilter: 'blur(12px)',
                    backgroundColor:
                        mode === 'dark'
                            ? 'rgba(15, 10, 42, 0.7)'
                            : '#ffffffcc',
                    border: `1px solid ${colors.dark.divider}`,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background:
                        mode === 'dark'
                            ? 'linear-gradient(145deg, #0f0a2a, #1a1240)'
                            : '#fff',
                    border: `1px solid ${colors.dark.divider}`,
                    transition: '0.3s',

                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 10px 30px ${colors.primary}33`,
                    },
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,

                        '& fieldset': {
                            borderColor: colors.dark.divider,
                        },

                        '&:hover fieldset': {
                            borderColor: colors.primary,
                        },

                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary,
                        },
                    },
                },
            },
        },
    },
});

export const darkTheme = createTheme(getDesignTokens('dark'));
export const lightTheme = createTheme(getDesignTokens('light'));

export const gradients = {
    primary: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
    soft: `linear-gradient(135deg, ${colors.primarySoft}, ${colors.primaryLight})`,
    background: `radial-gradient(circle at top, #06021d, #02000a)`,
};

export default darkTheme;