import Box from "@mui/material/Box";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function BasicCard({scheduler}) {

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {scheduler._id}
                </Typography>
                <Typography variant="h5" component="div">
                    TestName
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {scheduler.dayOfWeek.join(", ")}
                </Typography>
                <Typography variant="body2">
                    Start Time: {scheduler.startTime}
                    <br />
                    End Time: {scheduler.endTime}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}