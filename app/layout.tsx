"use client"
import {Experimental_CssVarsProvider as CssVarsProvider, useColorScheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './globals.css'
import {Inter} from 'next/font/google'
import * as React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";


const inter = Inter({subsets: ['latin']})

// export const metadata = {
//     title: 'SonarView',
//     description: 'Visualize the distance measured by a sonar sensor',
// }

const ModeSwitcher = () => {
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // for server-side rendering
        // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
        return null;
    }

    return (
        <Button
            variant="contained"
            color={"info"}
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
        >
            {mode === 'light' ? 'Dark' : 'Light'}
        </Button>
    );
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <CssVarsProvider>

            <html lang="en" color={"primary"}>
            <body className={inter.className}>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 0, display: {sm: 'block'}, marginRight: 5}}
                        >
                            <Link href={"/"}>Measure</Link>
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {sm: 'block'}}}
                        >
                            <Link href={"/scheduler"}>Scheduler</Link>
                        </Typography>
                        <ModeSwitcher/>
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
            </body>
            </html>
        </CssVarsProvider>
    )
}
