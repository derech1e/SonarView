'use client';
import DataTable from "@/app/DataTable";
import {useEffect, useState} from "react";
import {socket} from "@/app/socket";
import {ConnectionManager} from "@/app/components/ConnectionManager";
import {Box, LinearProgress, Skeleton, styled} from "@mui/material";

interface SensorData {
    status: 'SUCCESS' | 'ERROR';
    datetime: string;
    distance: number;
    sensor: {
        diff: number;
        echoTick: number;
        triggerTick: number;
    }
}

export interface DisplayObject {
    status: 'SUCCESS' | 'ERROR';
    datetime: string;
    distance: string;
    executionCount: number;
}

export default function Home() {

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [data, setData] = useState<SensorData[]>([]);
    const [displayObject, setDisplayObject] = useState<DisplayObject>({
        status: 'ERROR',
        distance: '-1',
        datetime: '',
        executionCount: 0
    });

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onSensorDataEvent(newData) {
            setData((prevData) => [...prevData, newData]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('distance', onSensorDataEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('distance', onSensorDataEvent);
        };
    });

    useEffect(() => {
        if (data.length === 0) return;

        if (data.length > 100) {
            socket.disconnect();
            return;
        }

        const date = new Date(data[data.length - 1].datetime);

        setDisplayObject({
            status: data[data.length - 1].status,
            distance: Number(data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length).toFixed(2) + ' cm',
            datetime: date.toLocaleTimeString() + `.${date.getMilliseconds()}`,
            executionCount: data.length
        });
    }, [data]);

    const Div = styled('div')(({theme}) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));

    return (
        <main className="flex min-h-screen flex-col items-center justify-center w-full p-24">
            <h1 className="text-4xl font-bold">Sonar<span className="text-blue-500">view</span></h1>

            <Div>{"Connection State: " + isConnected}</Div>
            <ConnectionManager isConnected={isConnected}/>
            <br/>
            <br/>
            <LinearProgress variant="determinate" value={data.length - 1} style={{ width: '50%' }}/>
            <div className={"w-1/2"}>
                {data.length == 0 ?
                    (<Box>
                            <Skeleton animation="wave" height={50}/>
                            <Skeleton animation="wave" height={50}/>
                            <Skeleton animation="wave" height={50}/>
                            <Skeleton animation="wave" height={50}/>
                            <Skeleton animation="wave" height={50}/>
                        </Box>
                    ) : (
                        <DataTable data={displayObject}/>
                    )
                }
            </div>
        </main>
    )
}
