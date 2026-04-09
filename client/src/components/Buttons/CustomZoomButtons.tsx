import React from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ICustomZoomButtonsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
}

const CustomZoomButtons: React.FC<ICustomZoomButtonsProps> = ({ onZoomIn, onZoomOut }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                right: '12px',
                top: '12px',
                zIndex: 1,
                filter: 'drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.15))',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    width: '48px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box
                    onClick={onZoomIn}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '24px',
                        cursor: 'pointer',
                        padding: '12px',
                        '&:hover': {
                            background: '#f5f5f5',
                        },
                    }}
                >
                    <AddIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '1px',
                        background: '#E0E0E0',
                    }}
                />
                <Box
                    onClick={onZoomOut}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '24px',
                        cursor: 'pointer',
                        padding: '12px',
                        '&:hover': {
                            background: '#f5f5f5',
                        },
                    }}
                >
                    <RemoveIcon sx={{ fontSize: 20 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default CustomZoomButtons;