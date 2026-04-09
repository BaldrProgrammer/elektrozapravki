import ActionMap from "@/components/map/ActionMap";
import {Box} from "@mui/material";

const cordinate = [
    {id: 1, x:20.494614, y:54.709996},
    {id: 2, x: 20.458208, y: 54.685393},
    {id: 3, x:20.479500, y: 54.954700}
]

export default function MapPageModule() {
    return(
        <Box sx={{height:'94vh', width:'100%'}}>
            <ActionMap stations={cordinate}/>
        </Box>
    )
}