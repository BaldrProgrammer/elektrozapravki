'use client'

import {Box, Container} from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";
import AuthBox from "@/components/Forms/AuthorizationForm/AuthBox";


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