"use client"
import {Grid} from "@mui/material";
import BasicCard from "@/app/components/SchedulerCard";
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

export default async function SchedulerPage() {


    // const { data, error, isLoading } = useSWR('http://pi.de:3000/scheduler/jobs', fetcher)
    const data = await getData();

    // if (error) return "An error has occurred." + error
    // if (isLoading) return "Loading...";

    return (
        <Grid container spacing={3} marginTop={1}>
            {data.map((scheduler) => (
                <Grid item xs={12} sm={6} md={4} key={scheduler._id}>
                    <BasicCard scheduler={scheduler}/>
                </Grid>
            ))}
        </Grid>
    );
}
