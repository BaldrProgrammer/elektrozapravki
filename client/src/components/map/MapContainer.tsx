'use client'

import {Box} from "@mui/material";
import React from "react";

interface IMapContainer {
    containerRef: React.Ref<HTMLDivElement>;
}

export default function MapContainer({ containerRef }:IMapContainer){
    return(
        <Box
            ref={containerRef}
            sx={{
                width:'100%',
                height:'100%',
                borderRadius:'24px',
                overflow:'hidden',
            }}
        />
    )
}