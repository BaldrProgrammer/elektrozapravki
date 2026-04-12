import ActionMap from "@/components/map/ActionMap";
import {Box} from "@mui/material";
import DashBoard from "@/components/DashBoard/DashBoard";


const cordinate = [
    {id: 1, x:20.494614, y:54.709996, power:5, price:15, connector:'USB', address:'г.Калининград, ул. Красная', network:'Газпром'},
    {id: 2, x: 20.458208, y: 54.685393, power:7, price:35, connector:'USB', address:'г.Калининград, ул. Красная', network:'Газпром'},
    {id: 3, x:20.479500, y: 54.954700, power:15, price:10, connector:'USB', address:'г.Калининград, ул. Красная', network:'Газпром'}
]

export default function MapPageModule() {
    return(
        <Box sx={{height:'94vh', width:'100%'}}>
            <ActionMap stations={cordinate}/>
            <DashBoard/>
        </Box>
    )
}