"use client"
import { useState } from "react";
import {useParams, useRouter} from "next/navigation";
import {
    Box,
    FormControl,
    InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";


export default function Edit() {
    const router = useParams();
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
    const { id } = router;
    const job = data.find((job) => job._id === id);

    const [editedJob, setEditedJob] = useState(job);
    const [dayOfWeek, setDayOfWeek] = useState(job!.dayOfWeek);
    const [startTime, setStartTime] = useState(job!.startTime);
    const [endTime, setEndTime] = useState(job!.endTime);

    const handleDayOfWeekChange = (event) => {
        setDayOfWeek(event.target.value);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

// ...

    return (
        <Box>
            {/* ... */}
            <Box component="form" sx={{mt: 2}}>
                <FormControl fullWidth>
                    <InputLabel id="day-of-week-label">Day of Week</InputLabel>
                    <Select
                        labelId="day-of-week-label"
                        id="day-of-week"
                        multiple
                        value={dayOfWeek}
                        onChange={handleDayOfWeekChange}
                    >
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                        <MenuItem value="Saturday">Saturday</MenuItem>
                        <MenuItem value="Sunday">Sunday</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    id="start-time"
                    label="Start Time"
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    sx={{mt: 2}}
                />
                <TextField
                    fullWidth
                    id="end-time"
                    label="End Time"
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    sx={{mt: 2}}
                />
                <Button variant="contained" color="primary" sx={{mt: 2}}>
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
}