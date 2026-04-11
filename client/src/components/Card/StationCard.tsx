'use client';

import { Box, Typography, Chip, Stack } from "@mui/material";
import LikeButton from "@/components/Buttons/LikeButton";
import ButtonRoad from "@/components/Buttons/ButtonRoad";
import { useTheme } from "@mui/material";

interface IStationCard {
    vt: number;
    price: number;
    connector: string;
    address: string;
    Net: string;
}

export default function StationCard({
                                        vt,
                                        price,
                                        connector,
                                        address,
                                        Net,
                                    }: IStationCard) {
    const theme = useTheme();


    return (
        <Box
            sx={{
                width: 320,
                p: 2,
                borderRadius: 4,
                backdropFilter: 'blur(14px)',
                background:
                    theme.palette.mode === 'dark'
                        ? 'rgba(15,10,42,0.75)'
                        : 'rgba(255,255,255,0.85)',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: `0 10px 30px ${theme.palette.primary.main}33`,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >

            <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, textAlign:'center' }}>
                        {Net}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ textAlign:'center' }}>
                        {address}
                    </Typography>
            </Box>


            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between' }}
            >
                <LikeButton />
                <ButtonRoad />
            </Stack>


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 3,
                    background:
                        theme.palette.mode === 'dark'
                            ? theme.palette.background.paper
                            : theme.palette.background.default,
                }}
            >
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Мощность
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight:600}}>
                        {vt} кВт
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Цена
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight:600}}>
                        {price} ₽
                    </Typography>
                </Box>

                <Chip
                    label={connector}
                    sx={{
                        fontWeight: 600,
                        background: theme.palette.primary.main,
                        color: '#fff',
                    }}
                />
            </Box>
        </Box>
    );
}