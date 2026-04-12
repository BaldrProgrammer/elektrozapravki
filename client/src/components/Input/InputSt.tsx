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
            variant="outlined"
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '14px',
                    backgroundColor: theme.palette.background.paper,
                    transition: 'all 0.25s ease',

                    '& input': {
                        padding: '12px 14px',
                    },

                    '& fieldset': {
                        borderColor: theme.palette.divider,
                    },

                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                    },

                    '&.Mui-focused': {
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}22`,
                    },

                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '1px',
                    },
                },

                '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                },

                '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.primary.main,
                },

                '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 0.7,
                },

                ...sx
            }}
        />
    );
}