'use client'
import {useTheme} from "@mui/material";
import { Box, AppBar, Toolbar } from "@mui/material";
import { ThemeToggle } from "@/components/Buttons/ThemeToggle";
import Logo from "@/components/Logo/Logo";


export default function NavBar() {
    const theme = useTheme()

    return (
        <AppBar
            sx={{
                width: '100%',
                mx: 'auto',
                mt: 2,
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(173,139,251,0.27)',
                height: 60,
                justifyContent: 'center',
                borderBottom: 'none',
                paddingX: 2,
                boxShadow: 'none',
                borderRadius: 12,
                position: 'relative',
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: { xs: 1, sm: 2 },
                    minHeight: 60,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Logo/>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <ThemeToggle />
                </Box>
            </Toolbar>
        </AppBar>
    );
}