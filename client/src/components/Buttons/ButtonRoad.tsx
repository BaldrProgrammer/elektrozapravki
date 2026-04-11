import {Button, Box, Typography} from "@mui/material";
import RouteIcon from '@mui/icons-material/Route';

export default function ButtonRoad(){
    return(
        <Box>
            <Button>
                <RouteIcon/>
            </Button>
            <Typography>
                Поехали
            </Typography>
        </Box>
    )
}