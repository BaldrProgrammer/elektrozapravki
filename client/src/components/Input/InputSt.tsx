import React from 'react'
import { useTheme, TextField, SxProps, Theme } from "@mui/material";

interface InputProps {
    value?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sx?: SxProps<Theme>;
    placeholder?: string;
}

export default function InputSt({
                                  label,
                                  value,
                                  onChange,
                                  sx,
                                  placeholder
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
            placeholder={placeholder}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    height: 40,
                    transition: 'all 0.2s ease',
                    boxShadow:
                        theme.palette.mode === 'dark'
                            ? '0 0 6px rgba(248, 80, 10, 0.25)'
                            : '0 0 4px rgba(248, 80, 10, 0.15)',
                    '& input': {
                        padding: '0 12px',
                        borderRadius: '16px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        border:'1px solid transparent',
                        background: 'linear-gradient( #fff, #fff, #fff) padding-box, linear-gradient(to right, #ad8bfb, #ad8bfb, #ad8bfb, #e8e4ff) border-box',
                    },


                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                    },

                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px',
                    },

                    '&.Mui-focused': {
                        boxShadow:
                            theme.palette.mode === 'dark'
                                ? '0 0 12px rgba(248, 80, 10, 0.5)'
                                : '0 0 8px rgba(248, 80, 10, 0.25)',
                    },
                },

                '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.primary.main,
                },
                ...sx
            }}
        />
    );
}