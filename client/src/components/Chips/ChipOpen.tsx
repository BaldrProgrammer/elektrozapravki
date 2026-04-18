'use client';

import React from 'react';
import { Box } from '@mui/material';
import { getShopStatus } from '@/utils/getOpeOrClose';

interface ChipsOpenProps {
    opening_hours: string;
}

export default function ChipOpen({ opening_hours }: ChipsOpenProps) {
    const status = getShopStatus(opening_hours);

    const isOpen = status === 'Открыто';

    return (
        <Box
            sx={{
                width: 120,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 999,

                color: 'rgb(26,18,64)',
                fontSize: 13,
                fontWeight: 600,

                boxShadow: `
          inset 0 0 20px #ad8bfb
        `,

                border: '2px solid transparent',

                background: isOpen
                    ? 'linear-gradient(#fff, #fff, #fff) padding-box, linear-gradient(to right, #ad8bfb, #f2eeff, #ad8bfb) border-box'
                    : 'linear-gradient(#fff, #fff, #fff) padding-box, linear-gradient(to right, #ffb4b4, #ff6b6b, #ffb4b4) border-box',

                transition: '0.3s',
            }}
        >
            {status}
        </Box>
    );
}