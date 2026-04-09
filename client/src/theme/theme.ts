'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// Цветовая палитра проекта
const colors = {
    // Темная тема
    dark: {
        background: '#101d26',
        surface: '#1f2f40',
        text: '#dde2e5',
        textSecondary: '#b0c4ce',
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    // Светлая тема
    light: {
        background: '#f5f5f5',
        surface: '#ffffff',
        text: '#101d26',
        textSecondary: '#1f2f40',
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    // Общие цвета (не зависят от темы)
    primary: '#f8500a',
    secondary: '#FB8D23',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#2196f3',
};

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: colors.primary,
            light: colors.secondary,
            dark: '#d43f00',
            contrastText: mode === 'dark' ? colors.dark.text : colors.light.text,
        },
        secondary: {
            main: colors.secondary,
            light: '#ffa347',
            dark: '#e67a00',
            contrastText: mode === 'dark' ? colors.dark.text : colors.light.text,
        },
        background: {
            default: mode === 'dark' ? colors.dark.background : colors.light.background,
            paper: mode === 'dark' ? colors.dark.surface : colors.light.surface,
        },
        text: {
            primary: mode === 'dark' ? colors.dark.text : colors.light.text,
            secondary: mode === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
            disabled: mode === 'dark' ? '#6f8f9c' : '#9e9e9e',
        },
        error: {
            main: colors.error,
        },
        warning: {
            main: colors.warning,
        },
        success: {
            main: colors.success,
        },
        info: {
            main: colors.info,
        },
        divider: mode === 'dark' ? colors.dark.divider : colors.light.divider,
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 40,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 24px',
                    transition: 'all 0.2s ease',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        transform: 'translateY(-1px)',
                    },
                },
                outlined: {
                    borderColor: colors.primary,
                    color: colors.primary,
                    '&:hover': {
                        borderColor: colors.secondary,
                        backgroundColor: 'rgba(248, 80, 10, 0.04)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    boxShadow: mode === 'dark'
                        ? '0 2px 8px rgba(0, 0, 0, 0.15)'
                        : '0 2px 8px rgba(0, 0, 0, 0.05)',
                },
                elevation2: {
                    boxShadow: mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
                colorPrimary: {
                    backgroundColor: colors.primary,
                    color: mode === 'dark' ? colors.dark.text : colors.light.text,
                },
                colorSecondary: {
                    backgroundColor: colors.secondary,
                    color: mode === 'dark' ? colors.dark.text : colors.light.text,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: mode === 'dark' ? colors.dark.divider : colors.light.divider,
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: 40,
                    '&.Mui-selected': {
                        backgroundColor: colors.primary,
                        color: mode === 'dark' ? colors.dark.text : colors.light.text,
                        '&:hover': {
                            backgroundColor: colors.secondary,
                        },
                    },
                },
            },
        },
    },
});

// Создаем тему для светлого и темного режима
export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));

// Градиенты для обеих тем
export const gradients = {
    primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    darkToPrimary: `linear-gradient(135deg, ${colors.dark.background} 0%, ${colors.primary} 100%)`,
    lightToPrimary: `linear-gradient(135deg, ${colors.light.background} 0%, ${colors.primary} 100%)`,
};

export default darkTheme;