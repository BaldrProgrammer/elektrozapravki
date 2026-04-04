'use client'

import {Box, Typography} from "@mui/material";
import Avatar from "@/components/Card/Avatar";
import {useTheme} from "@mui/material";


interface UserCarsProps{
    name:string;
    surname:string;
    email:string;
}


export default function UserCard({name, surname, email}:UserCarsProps){

    const theme = useTheme()

    return(
        <Box sx={{display:'flex'}}>
            <Box sx={{height:'100%', mr:3,}}>
                <Avatar/>
            </Box>
            <Box sx={{
                height:200,
                width:350,
                p:2,
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(173,139,251,0.27)',
                borderRadius: 2,
            }}>
                <Box sx={{display:'flex',}}>
                    <Typography sx={{mr: 1,}}>
                        {name}
                    </Typography>
                    <Typography>
                        {surname}
                    </Typography>
                </Box>
                <Typography>
                    {email}
                </Typography>
            </Box>
        </Box>
    )
}