"use client";
import {SmallBox} from "@/app/dashboard/(components)/SmallBox";
import {MediumBox} from "@/app/dashboard/(components)/MediumBox";
import {useEffect, useState} from "react";
import {socket} from "@/app/socket";

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

export default function SonarPage() {


    const [isConnected, setIsConnected] = useState(socket.connected);
    const [data, setData] = useState<SensorData[]>([]);

    useEffect(() => {
        function onConnect() {
            setData([])
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

        if (data.length > 99) {
            socket.disconnect();
            return;
        }
    }, [data]);

    return (
        <div className={"flex flex-col items-center justify-center w-full"}>
            <div className="flex flex-col text-start w-full gap-2"><h1 className="font-medium text-xl">🎉
                Sonar measurements are being taken</h1><p className="text-sm text-gray-600">Like, lots and lots of
                files. So
                many files!</p></div>
            <button
                className="p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500 self-start mt-2 disabled:bg-red-300"
                disabled={isConnected} onClick={async (event) => {
                setData([]);
                setIsConnected(true);
                await setTimeout(() => {
                    socket.connect();
                }, 1000);
            }}>Execute
            </button>
            <div className={"flex flex-row w-full mt-4 gap-4 space-between"}>
                <MediumBox heading={"Connection State"} subheading={"Connected/ Disconnected"}
                           value={isConnected ? "Connected" : "Disconnected"}/>
                <MediumBox heading={"Execution Count"} subheading={"till 100"} value={data.length}/>
            </div>
            <div className={"flex flex-row w-full mt-4 gap-4 space-between"}>
                <SmallBox heading={"Datetime"} subheading={"100ms"}
                          value={new Date(data[data.length - 1]?.datetime).toJSON()?.slice(11, 23) ?? 'NaN'}/>
                <SmallBox heading={"Trigger Tick"} subheading={"Sensor to Surface"}
                          value={data[data.length - 1]?.sensor.triggerTick ?? 'NaN'}/>
                <SmallBox heading={"Echo Tick"} subheading={"Surface to Sensor"}
                          value={data[data.length - 1]?.sensor.echoTick ?? 'NaN'}/>
                <SmallBox heading={"Difference"} subheading={"Connected/ Disconnected"}
                          value={data[data.length - 1]?.sensor.diff ?? 'NaN'}/>
            </div>
            <div className={"flex flex-row w-full mt-4 gap-4 space-between"}>
                <MediumBox heading={"Distance"} subheading={"in cm"}
                           value={Number(data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length).toFixed(2)}/>
                <MediumBox heading={"Volume"} subheading={"in L"}
                           value={getVolumeLiter((data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length)) }/>
            </div>
        </div>
    );
}

const getVolumeLiter = (distance: number) => {
    let radius = 100;
    let sensorToMax = 63.13;
    let sensorToMin = 236;
    let stopDistance = 3;

    let realDistance = sensorToMin - stopDistance - sensorToMax - (distance - sensorToMax);

    return Number((realDistance * Math.PI * Math.pow(radius, 2)) / 1000).toFixed(2)

}