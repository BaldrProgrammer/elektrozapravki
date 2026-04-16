'use client'

import React, {useState} from "react";
import {Button, Box, Typography} from "@mui/material";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

export default function ButtonRufuelCard(){


    return(
        <Box>
            <Button>
                <ElectricBoltIcon/>
            </Button>
            <Typography>
                Зарядка
            </Typography>
        </Box>
    )
}