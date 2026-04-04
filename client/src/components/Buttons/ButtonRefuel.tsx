'use client';

import React from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme} from '@mui/material';
import {useTheme} from "@mui/material";
import {useRouter} from "next/navigation";

interface ButtonAdminProps {
    onClick?: () => void;
    sx?: SxProps<Theme>;
}

export default function ButtonRefuel({
                                         onClick,
                                         sx,
                                     }: ButtonAdminProps) {
    const theme = useTheme()
    const navigate = useRouter()

    return (
        <Button
            onClick={()=>(navigate.push('/private/map'))}
            disableElevation
            sx={{
                width: 200,
                height: 200,
                borderRadius: 2, // капсула
                color: theme.palette.text.primary,
                fontWeight: 500,
                backdropFilter: 'blur(10px)',

                // Градиент из твоей темы
                background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.primary.light} 100%)`,

                // мягкий glow
                boxShadow: `
                    0 0 20px ${theme.palette.primary.main}55,
                    inset 0 1px 2px rgba(255,255,255,0.2)
                `,

                // стеклянный эффект
                border: `1px solid ${theme.palette.primary.light}55`,

                transition: 'all 0.3s ease',

                '&:hover': {
                    boxShadow: `
                        0 0 30px ${theme.palette.primary.main}aa,
                        inset 0 1px 2px rgba(255,255,255,0.3)
                    `,
                },

                '&:active': {

                },

                ...sx,
            }}
        >
           Заправить
        </Button>
    );
}