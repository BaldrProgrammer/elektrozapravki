import { ThemeContextProvider } from '@/context/ThemeContext';
import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import {Container } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Station',
    description: 'Admin panel with theme switching',
    icons: {
        icon: '/logo/type3.svg',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#f8500a"/>
        </head>
        <body className={inter.className} suppressHydrationWarning>
        <ThemeContextProvider>
            <Container maxWidth="xxl" sx={{ mt: 3 }}>
                {children}
            </Container>
        </ThemeContextProvider>
        </body>
        </html>
    );
}