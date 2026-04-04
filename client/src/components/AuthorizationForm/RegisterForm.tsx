'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Box, Typography, Paper, useTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import ButtonStation from '../Buttons/ButtonStation';

interface IRegisterFormProps {
    switchForm: (shouldRegister: boolean) => void;
    handleClose: () => void;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Обязательное поле'),
    lastName: Yup.string().required('Обязательное поле'),
    email: Yup.string().email('Некорректный email').required('Обязательное поле'),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
});

const inputStyles = {
    '& label.Mui-focused': {
        color: '#AD8BFB',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '&.Mui-focused fieldset': {
            borderColor: '#AD8BFB',
        },
        '&:hover fieldset': {
            borderColor: '#AD8BFB',
        },
    },
};

const RegisterForm: React.FC<IRegisterFormProps> = ({ switchForm, handleClose }) => {
    const theme = useTheme();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={() => {
                router.push('/private/profile');
            }}
        >
            {({ errors, touched, isValid }) => (
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: '24px',
                        background: theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(173,139,251,0.27)',
                    }}
                >
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={700}>
                            Регистрация
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Создайте аккаунт
                        </Typography>
                    </Box>

                    <Form>
                        <Box sx={{ mb: 2 }}>
                            <Field
                                as={TextField}
                                fullWidth
                                name="firstName"
                                label="Имя"
                                error={touched.firstName && !!errors.firstName}
                                helperText={<ErrorMessage name="firstName" />}
                                sx={inputStyles}
                            />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Field
                                as={TextField}
                                fullWidth
                                name="lastName"
                                label="Фамилия"
                                error={touched.lastName && !!errors.lastName}
                                helperText={<ErrorMessage name="lastName" />}
                                sx={inputStyles}
                            />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Field
                                as={TextField}
                                fullWidth
                                name="email"
                                label="Email"
                                error={touched.email && !!errors.email}
                                helperText={<ErrorMessage name="email" />}
                                sx={inputStyles}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Field
                                as={TextField}
                                fullWidth
                                name="password"
                                label="Пароль"
                                type={showPassword ? 'text' : 'password'}
                                error={touched.password && !!errors.password}
                                helperText={<ErrorMessage name="password" />}
                                sx={inputStyles}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(p => !p)}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <ButtonStation sx={{width:'100%'}}>
                            Зарегистрироваться
                        </ButtonStation>
                    </Form>
                </Paper>
            )}
        </Formik>
    );
};

export default RegisterForm;