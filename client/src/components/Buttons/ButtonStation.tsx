'use client';

import React from 'react';
import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material';


interface ButtonAdminProps {
    children: React.ReactNode;
    onClick?: () => void;
    sx?: SxProps<Theme>;
    variant?: 'contained';
}

export default function ButtonStation({
                                          children,
                                          onClick,
                                          sx,
                                          variant = 'contained',
                                      }: ButtonAdminProps) {
    return (
        <Button
            onClick={onClick}
            variant = 'contained'
            sx={{
                width:220,
                height:40,
                borderRadius: 12,
                color:'rgb(26,18,64)',

                boxShadow: `
                  inset 0 0 30px #ad8bfb
                `,
                border:'2px solid transparent',
                background: 'linear-gradient( #fff, #fff, #fff) padding-box, linear-gradient(to right, #f2eeff, #ad8bfb, #ad8bfb, #f2eeff) border-box',
                ...sx
            }}
        >
            {children}
        </Button>
    );
}