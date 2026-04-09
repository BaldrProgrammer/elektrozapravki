"use client"


import {Box, Typography, Container} from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";
import ButtonStation from "@/components/Buttons/ButtonStation";
import {useRouter} from "next/navigation";


export default function MainPageModule() {
    const navigate = useRouter()


    return (
        <Box
            sx={{
                height: '90vh',
                width: '100%',
            }}
        >
            <NavBar/>
            <Container
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Box>
                    <Box>
                        <Typography variant="h1" align="center" >
                            Заряжайте электромобиль с умом
                        </Typography>
                        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                            Все зарядные станции на карте. Реальный статус. Маршрут за секунду
                        </Typography>
                        <Typography  align="center" sx={{ mt: 1 }}>
                            Экономьте время и нервы
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt:1,}}>
                        <ButtonStation onClick={()=>(navigate.push('/public/map'))}> Пора начать </ButtonStation>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}