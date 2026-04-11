'use client'

import React, {useState} from "react";
import {Button, Box, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function LikeButton(){
    const [like, setLike] = useState(false)

    const handleLike = () => {
        setLike(!like)
    }


    return(
        <Box>
            <Button onClick={handleLike}>
                {like ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </Button>
            <Typography>
                Любимка
            </Typography>
        </Box>
    )
}