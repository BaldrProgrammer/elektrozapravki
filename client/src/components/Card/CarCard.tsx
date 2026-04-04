'use client'

import {Box, Typography} from "@mui/material";
import Avatar from "@/components/Card/Avatar";
import {useTheme} from "@mui/material";


interface CarCarsProps{
    nameCar:string;
}


export default function CardCard({nameCar}:CarCarsProps){

    const theme = useTheme()

    return(
        <Box sx={{}}>
            <Box sx={{
                height:200,
                width:350,
                p:2,
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(173,139,251,0.27)',
                borderRadius: 2,}}
            >

            </Box>
            <Box sx={{
            }}>
                <Box sx={{display:'flex',}}>
                    <Typography sx={{mt: 1,}}>
                        {nameCar}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}