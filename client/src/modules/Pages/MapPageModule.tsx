"use client"

import ActionMap from "@/components/map/ActionMap";
import {Box} from "@mui/material";
import DashBoard from "@/components/DashBoard/DashBoard";
import useActionStation from "@/hooks/ActionStation";



export default function MapPageModule() {
    const {loading, error, data} = useActionStation()

    return(
        <Box sx={{height:'100vh', width:'100%'}}>
            <ActionMap data={data}/>
            <DashBoard/>
        </Box>
    )
}