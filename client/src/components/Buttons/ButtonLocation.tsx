import {IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';


interface IButtonLocation {
    handleGeolocation: () => void,
}

export default function ButtonLocation({handleGeolocation}:IButtonLocation){
    return(
        <IconButton
            onClick={handleGeolocation}
            sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '50%',
                width: 48,
                height: 48,
            }}
        >
            <MyLocationIcon />
        </IconButton>
    )
}