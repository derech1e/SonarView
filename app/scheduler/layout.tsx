"use client"
import {Container, Paper} from "@mui/material";
import Box from "@mui/material/Box";

export default function SchedulerLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {


    return (
        <Box>
            {children}
        </Box>
    );
}