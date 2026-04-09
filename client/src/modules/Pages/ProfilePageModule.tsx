import {Box, Container, Typography} from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";
import ButtonRefuel from "@/components/Buttons/ButtonRefuel";
import UserCard from "@/components/Card/UserCard";
import AddCar from "@/modules/AddCars/AddCar";


export default function ProfilePageModule(){
    return(

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
                    mt:4,

                }}>
                <Box sx={{display:'flex', justifyContent:'space-between', mb:4,}}>
                    <UserCard name={'Карина'} surname={'Рогалевич'} email={'karina.rogalevich@mail.ru'}/>
                    <ButtonRefuel/>
                </Box>
                <AddCar/>
            </Container>
        </Box>
    )
}