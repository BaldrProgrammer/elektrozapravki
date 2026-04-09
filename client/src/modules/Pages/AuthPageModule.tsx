'use client'

import {Box, Container, Typography} from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";
import ButtonStation from "@/components/Buttons/ButtonStation";
import LoginForm from "@/components/AuthorizationForm/LoginForm";
import AuthBox from "@/components/AuthorizationForm/AuthBox";


export default function AuthPageModule(){
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
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Box>
                    <AuthBox/>
                </Box>
            </Container>
        </Box>
    )
}