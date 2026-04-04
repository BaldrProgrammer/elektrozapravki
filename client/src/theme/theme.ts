'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// Цветовая палитра проекта (без оранжевого)
const colors = {
    // Темная тема (основная)
    dark: {
        background: '#030014',
        surface: '#1f2f40',
        surface2: '#ad8bfb',
        text: '#e8e4ff',
        textSecondary: '#c8beff',
        divider: '#7455f8',
    },
    // Светлая тема (опционально)
    light: {
        background: '#f5f5f5',
        surface: '#ffffff',
        surface2: '#e8e4ff',
        text: '#0b0070',
        textSecondary: '#0d0087',
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    // Акцентные цвета (только фиолетовые/синие)
    primary: '#7455f8',      // основной фиолетовый
    primaryLight: '#ad8bfb', // светлый фиолетовый
    primaryDark: '#5a3ad6',  // темный фиолетовый
    secondary: '#8f6ff9',    // второстепенный фиолетовый
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
            light: colors.primaryLight,
            dark: colors.primaryDark,
            contrastText: mode === 'dark' ? colors.dark.text : colors.light.text,
        },
        secondary: {
            main: colors.secondary,
            light: '#a07ffb',
            dark: '#6b4fe0',
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
            fontSize: '3.5rem',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${colors.dark.text} 0%, ${colors.primaryLight} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.02em',
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: colors.dark.background,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: colors.dark.divider,
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: colors.primary,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    textTransform: 'none',
                    fontWeight: 400,
                    padding: '10px 28px',
                    transition: 'all 0.3s ease',
                },
                containedPrimary: {
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                    boxShadow: `0 4px 15px ${colors.primary}80`,
                    '&:hover': {
                        boxShadow: `0 0px 20px ${colors.primary}cc`,
                    },
                },
                containedSecondary: {
                    background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primaryLight} 100%)`,
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    },
                },
                outlined: {
                    borderColor: colors.primary,
                    color: colors.primary,
                    '&:hover': {
                        borderColor: colors.primaryLight,
                        backgroundColor: `${colors.primary}14`,
                        transform: 'translateY(-1px)',
                    },
                },
                text: {
                    color: colors.primary,
                    '&:hover': {
                        backgroundColor: `${colors.primary}14`,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: colors.dark.surface,
                    backdropFilter: 'blur(10px)',
                },
                elevation1: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${colors.dark.divider}`,
                },
                elevation2: {
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    border: `1px solid ${colors.dark.divider}`,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundColor: colors.dark.surface,
                    border: `1px solid ${colors.dark.divider}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                        borderColor: colors.primary,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(3, 0, 20, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${colors.dark.divider}`,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 500,
                },
                colorPrimary: {
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                    color: colors.dark.text,
                },
                colorSecondary: {
                    backgroundColor: colors.dark.surface2,
                    color: colors.dark.text,
                },
                outlined: {
                    borderColor: colors.dark.divider,
                    color: colors.dark.text,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: colors.dark.divider,
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
                standardSuccess: {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    color: '#4caf50',
                },
                standardError: {
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336',
                },
                standardWarning: {
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    color: '#ff9800',
                },
                standardInfo: {
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    color: '#2196f3',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: 40,
                    '&.Mui-selected': {
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                        color: colors.dark.text,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                        },
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
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: colors.dark.textSecondary,
                    '&.Mui-focused': {
                        color: colors.primary,
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: `${colors.primary}14`,
                    },
                    '&.Mui-selected': {
                        backgroundColor: `${colors.primary}1f`,
                        '&:hover': {
                            backgroundColor: `${colors.primary}29`,
                        },
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: colors.dark.text,
                    '&:hover': {
                        backgroundColor: `${colors.primary}14`,
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    '&.Mui-selected': {
                        color: colors.primary,
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: colors.primary,
                    height: 3,
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: `${colors.primary}33`,
                    borderRadius: 4,
                },
                bar: {
                    backgroundColor: colors.primary,
                    borderRadius: 4,
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottomColor: colors.dark.divider,
                    },
                    '&:hover:before': {
                        borderBottomColor: colors.primary,
                    },
                    '&:after': {
                        borderBottomColor: colors.primary,
                    },
                },
            },
        },
    },
});

// Создаем тему (только темная)
export const darkTheme = createTheme(getDesignTokens('dark'));
export const lightTheme = createTheme(getDesignTokens('light'));
// Градиенты для темной темы (без оранжевого)
export const gradients = {
    primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
    text: `linear-gradient(135deg, ${colors.dark.text} 0%, ${colors.primaryLight} 100%)`,
    surface: `linear-gradient(135deg, ${colors.dark.surface} 0%, ${colors.dark.surface2} 100%)`,
    background: `radial-gradient(circle at 10% 20%, ${colors.dark.background} 0%, #02000f 100%)`,
};

export default darkTheme;