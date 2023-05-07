"use client"
import {Autocomplete, Checkbox, Chip, Paper, TextField} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

let options = [
    {label: 'Monday'},
    {label: 'Tuesday'},
    {label: 'Wednesday'},
    {label: 'Thursday'},
    {label: 'Friday'},
    {label: 'Saturday'},
    {label: 'Sunday'},
];

async function getData() {
    const res = await fetch('http://192.168.200.193:3000/scheduler/jobs');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function SchedulerPage({params}) {

    const data = await getData();
    // const data = [{
    //     "_id": "6442a8775518eaa53c3ac786",
    //     "dayOfWeek": ["Monday", "Wednesday"],
    //     "startTime": "18:14",
    //     "endTime": "18:15",
    //     "createdAt": "2023-04-21T15:15:03.101Z",
    //     "updatedAt": "2023-04-21T15:15:03.101Z",
    //     "__v": 1
    // }]


    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={options}
                disableCloseOnSelect
                defaultValue={data[0].dayOfWeek.map(day => {
                    return options.find(option => option.label === day);
                })}
                getOptionLabel={(option) => option!.label}
                renderOption={(props, option, {selected}) => (
                    <li {...props} key={option!.label}>
                        <Checkbox
                            key={option!.label}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {option!.label}
                    </li>
                )}
                renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                        <Chip {...getTagProps({index})} key={option!.label} label={option!.label}/>
                    ))
                }}
                style={{width: 500}}
                renderInput={(params) => (
                    <TextField {...params} label="Weekdays" placeholder=""/>
                )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                Von<TimePicker defaultValue={dayjs(data[0].startTime, "HH:mm")} ampm={false}/>
                Bis<TimePicker defaultValue={dayjs(data[0].endTime, "HH:mm")} ampm={false}/>
            </LocalizationProvider>
        </Paper>
    );
}