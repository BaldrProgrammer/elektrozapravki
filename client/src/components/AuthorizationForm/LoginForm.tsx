'use client';
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Link, Box, Typography, Paper, useTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
// import { BASE_URL } from '@/constant';
// import BasicSnackbar from '../BasicSnackbar/BasicSnackbar';
import ButtonStation from '../Buttons/ButtonStation';
// import { UserContext } from '../../context/UserContext/UserContext';
// import { decodeToken } from '@/utils/auth';


interface ILoginFormProps {
    switchForm: (shouldRegister: boolean) => void;
    handleClose: () => void;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email указан некорректно').required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
});

const inputStyles = {
    '& label.Mui-focused': {
        color: '#AD8BFB',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '&.Mui-focused fieldset': {
            borderColor: '#AD8BFB',
            borderWidth: '2px',
        },
        '&:hover fieldset': {
            borderColor: '#AD8BFB',
        },
    },
    '& .MuiInputBase-input': {
        fontWeight: 500,
    },
    '& .MuiInputBase-input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #fff inset',
        WebkitTextFillColor: '#000',
        borderRadius: '20px',
    },
};

const STORAGE_KEY = 'user_email';

const LoginForm: React.FC<ILoginFormProps> = ({ switchForm, handleClose }) => {
    const theme = useTheme();

    const [initialEmail, setInitialEmail] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'warning' | 'info',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const userContext = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        setInitialEmail(localStorage.getItem(STORAGE_KEY) || '');
    }, []);

    const initialValues = {
        email: initialEmail,
        password: '',
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleReset = () => {
        handleClose();
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
                onReset={handleReset}
                enableReinitialize
            >
                {({ errors, touched, isValid, submitForm, isSubmitting: formikSubmitting, setFieldValue, values }) => {
                    const disabled = !isValid || isSubmitting;

                    return (
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
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.primary,
                                        mb: 1,
                                    }}
                                >
                                    Добро пожаловать
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Войдите в свой аккаунт
                                </Typography>
                            </Box>

                            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ mb: 3 }}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        error={touched.email && !!errors.email}
                                        helperText={<ErrorMessage name="email" component="div" />}
                                        sx={inputStyles}
                                        disabled={isSubmitting}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                            setFieldValue('email', e.target.value);
                                            if (typeof window !== 'undefined') {
                                                localStorage.setItem(STORAGE_KEY, e.target.value);
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        as={TextField}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        disabled={isSubmitting}
                                                        sx={{
                                                            color: '#AD8BFB',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(173,139,251,0.04)',
                                                            },
                                                        }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Пароль"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        error={touched.password && !!errors.password}
                                        helperText={<ErrorMessage name="password" component="div" />}
                                        sx={inputStyles}
                                        disabled={isSubmitting}
                                    />
                                </Box>


                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                    }}
                                >
                                    <ButtonStation
                                        onClick={()=>(router.push('/private/profile'))}
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        {isSubmitting ? 'Вход...' : 'Войти'}
                                    </ButtonStation>

                                </Box>
                            </Form>
                        </Paper>
                    );
                }}
            </Formik>

            {/*<BasicSnackbar*/}
            {/*    open={snackbarMessage.open}*/}
            {/*    message={snackbarMessage.message}*/}
            {/*    severity={snackbarMessage.severity}*/}
            {/*    handleClose={() => setSnackbarMessage({ ...snackbarMessage, open: false })}*/}
            {/*/>*/}
        </>
    );
};

export default LoginForm;