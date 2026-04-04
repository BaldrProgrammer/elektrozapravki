'use client';

import React from 'react';
import { Box } from '@mui/material';

interface ICustomMarkerProps {
    size?: number;
    color?: string;
    pulse?: boolean;
}

const CustomMarker: React.FC<ICustomMarkerProps> = ({
                                                        size = 60,
                                                        color = '#1A1A1A',
                                                        pulse = false,
                                                    }) => {
    // Размер внутреннего белого круга
    const innerCircleSize = size * 0.33;

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
            {/* Основной чёрный круг */}
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
                {/* Белый круг внутри */}
                <Box
                    sx={{
                        width: innerCircleSize,
                        height: innerCircleSize,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                    }}
                />
            </Box>

            {/* Ножка маркера, плавно вытекающая из круга */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 5,
                    height: 12,
                    backgroundColor: color,
                    borderRadius: '10px 10px 0 0',
                }}
            >
                {/* Нижняя часть ножки */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 0,
                        width: '100%',
                        height: 14,
                        backgroundColor: color,
                        borderRadius: '0 0 8px 8px',
                    }}
                />
            </Box>
        </Box>
    );
};

export default CustomMarker;