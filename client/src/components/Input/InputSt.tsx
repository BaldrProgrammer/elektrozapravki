import React from 'react'
import { useTheme, TextField, SxProps, Theme } from "@mui/material";

interface InputProps {
    value?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    sx?: SxProps<Theme>;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
}

export default function InputSt({
                                    label,
                                    value,
                                    onChange,
                                    onBlur,
                                    sx,
                                    placeholder,
                                    error,
                                    helperText,
                                    required,
                                    disabled
                                }: InputProps) {

    const theme = useTheme();

    return (
        <TextField
            fullWidth
            size="small"
            variant="outlined"
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            required={required}
            disabled={disabled}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    height: 40,
                    transition: 'all 0.2s ease',
                    boxShadow: error
                        ? '0 0 6px rgba(211, 47, 47, 0.5)'
                        : theme.palette.mode === 'dark'
                            ? '0 0 6px rgba(248, 80, 10, 0.25)'
                            : '0 0 4px rgba(248, 80, 10, 0.15)',

                    '& input': {
                        padding: '0 12px',
                        borderRadius: '16px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        border: error ? '1px solid #d32f2f' : '1px solid transparent',
                        background: error
                            ? '#fff'
                            : 'linear-gradient( #fff, #fff, #fff) padding-box, linear-gradient(to right, #ad8bfb, #ad8bfb, #ad8bfb, #e8e4ff) border-box',
                    },

                    '&:hover fieldset': {
                        borderColor: error ? '#d32f2f' : theme.palette.primary.main,
                    },

                    '&.Mui-focused fieldset': {
                        borderColor: error ? '#d32f2f' : theme.palette.primary.main,
                        borderWidth: '2px',
                    },

                    '&.Mui-focused': {
                        boxShadow: error
                            ? '0 0 12px rgba(211, 47, 47, 0.5)'
                            : theme.palette.mode === 'dark'
                                ? '0 0 12px rgba(248, 80, 10, 0.5)'
                                : '0 0 8px rgba(248, 80, 10, 0.25)',
                    },


                    '&.Mui-disabled': {
                        opacity: 0.6,
                        '& input': {
                            background: '#f5f5f5',
                        },
                    },
                },

                '& .MuiInputLabel-root': {
                    color: error ? '#d32f2f' : 'inherit',
                },

                '& .MuiInputLabel-root.Mui-focused': {
                    color: error ? '#d32f2f' : theme.palette.primary.main,
                },

                '& .MuiFormHelperText-root': {
                    color: error ? '#d32f2f' : 'inherit',
                    marginLeft: 0,
                    fontSize: '0.7rem',
                },

                ...sx
            }}
        />
    );
}