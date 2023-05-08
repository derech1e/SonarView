// app/CronJobs.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const CronJobs = () => {
    const router = useRouter();
    const data = [
        {
            _id: "6442a8775518eaa53c3ac786",
            dayOfWeek: ["Monday", "Wednesday"],
            startTime: "18:14",
            endTime: "18:15",
            createdAt: "2023-04-21T15:15:03.101Z",
            updatedAt: "2023-04-21T15:15:03.101Z",
            __v: 1,
        },
    ];
    const handleRowClick = (id) => {
        router.push(`/cron/${id}`);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Cron Jobs
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Day of Week</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((job) => (
                        <TableRow key={job._id} hover onClick={() => handleRowClick(job._id)}>
                            <TableCell>{job._id}</TableCell>
                            <TableCell>{job.dayOfWeek.join(", ")}</TableCell>
                            <TableCell>{job.startTime}</TableCell>
                            <TableCell>{job.endTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default CronJobs;
