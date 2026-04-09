'use client'

import {Box} from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {useTheme} from "@mui/material";

export default function Avatar(){
    const theme = useTheme()

    return(
        <Box
            sx={{
                width:200,
                height:200,
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(173,139,251,0.27)',
                borderRadius: 2,
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                color:theme.palette.mode === 'dark' ? 'rgba(200,190,255,0.3)' : 'rgba(173,139,251,0.68)',
            }}
        >
            <SentimentSatisfiedAltIcon sx={{fontSize:50,}}/>
        </Box>
    )
}