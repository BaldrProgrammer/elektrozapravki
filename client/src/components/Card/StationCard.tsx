'use client';

import { Box, Typography, Chip, Stack } from "@mui/material";
import LikeButton from "@/components/Buttons/LikeButton";
import ButtonRoad from "@/components/Buttons/ButtonRoad";
import { useTheme } from "@mui/material";
import ButtonRufuelCard from "@/components/Buttons/ButtonRufuelCard";
import { IStation } from "@/types/StationsType";
import { getOpenOrClose } from "@/utils/getOpeOrClose";
import {IAdressType} from "@/types/StationsType";
import {ICharacteristics} from "@/types/StationsType";


export default function StationCard({
                                        name,
                                        price,
                                        address,
                                        opening_hours,
                                        websites,
                                        characteristics,
                                        cords,
                                        timezone,
                                        phone_numbers
                                    }: IStation) {

    const theme = useTheme();
    const availability = getOpenOrClose(opening_hours);


    const formatAddress = (addr: IAdressType): string => {
        const parts = [];
        if (addr.st) parts.push(`ул. ${addr.st}`);
        if (addr.microdistrict) parts.push(`мкр. ${addr.microdistrict}`);
        if (addr.district) parts.push(`${addr.district} р-н`);
        if (addr.city) parts.push(`г. ${addr.city}`);
        if (addr.region) parts.push(`${addr.region} обл.`);
        if (addr.country) parts.push(addr.country);

        return parts.join(', ');
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                minHeight: 420,
                p: 2,
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
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
                <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                    {name || 'Электрозарядная станция'}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {formatAddress(address)}
                </Typography>
            </Box>

            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between' }}
            >
                <LikeButton />
                <ButtonRufuelCard />
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
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {characteristics?.[0]?.kwt || '—'} кВт
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Цена
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {price || '—'} ₽
                    </Typography>
                </Box>

                <Chip
                    label={characteristics?.[0]?.type || 'Стандарт'}
                    sx={{
                        fontWeight: 600,
                        background: theme.palette.primary.main,
                        color: '#fff',
                    }}
                />
            </Box>


            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                    Режим работы
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                    {availability || opening_hours || 'Круглосуточно'}
                </Typography>

                {phone_numbers && phone_numbers.length > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 1 }}>
                        {phone_numbers[0]}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}