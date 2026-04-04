'use client';
import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
    const [isRegister, setIsRegister] = useState(false);

    const switchForm = (shouldRegister: boolean) => {
        setIsRegister(shouldRegister);
    };

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setIsRegister(newValue === 1);
    };

    return (
        <Box
            sx={{

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Box sx={{ width: 420, maxWidth: '100%' }}>
                <Paper
                    elevation={0}
                    sx={{
                        mb: 2,
                        p: '4px',
                        borderRadius: '16px',
                        background: 'rgba(173,139,251,0.15)',
                        display: 'flex',
                    }}
                >
                    <Box
                        onClick={() => setIsRegister(false)}
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            py: 1,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: !isRegister ? '#AD8BFB' : 'transparent',
                            color: !isRegister ? '#fff' : 'inherit',
                            transition: '0.3s',
                            fontWeight: 600,
                        }}
                    >
                        Вход
                    </Box>

                    <Box
                        onClick={() => setIsRegister(true)}
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            py: 1,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: isRegister ? '#AD8BFB' : 'transparent',
                            color: isRegister ? '#fff' : 'inherit',
                            transition: '0.3s',
                            fontWeight: 600,
                        }}
                    >
                        Регистрация
                    </Box>
                </Paper>

                {isRegister ? (
                    <RegisterForm
                        switchForm={switchForm}
                        handleClose={() => {}}
                    />
                ) : (
                    <LoginForm
                        switchForm={switchForm}
                        handleClose={() => {}}
                    />
                )}
            </Box>
        </Box>
    );
};

export default AuthContainer;