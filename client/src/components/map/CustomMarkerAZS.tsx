'use client';

import React from 'react';
import { Box } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

interface ICustomMarkerProps {
    size?: number;
    color?: string;
    pulse?: boolean;
}

const CustomMarkerAZS: React.FC<ICustomMarkerProps> = ({
                                                        size = 60,
                                                        color = '#0f0a2a',
                                                        pulse = false,
                                                    }) => {


    return (
        <Box
            sx={{
                position: 'relative',
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
        >

            <Box
                sx={{
                    position: 'relative',
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:'white'
                    }}
                >
                    <ElectricBoltIcon/>
                </Box>
            </Box>


        </Box>
    );
};

export default CustomMarkerAZS;