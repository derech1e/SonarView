"use client";
import {SmallBox} from "@/components/SmallBox";
import {MediumBox} from "@/components/MediumBox";
import {useEffect, useState} from "react";
import {sonarSocket} from "@/app/socket";
import {AVERAGE_WATER_FILL_PER_MINUTE, AVERAGE_WATER_USAGE_PER_MINUTE, useSettingsContext} from "@/components/Context";

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

const formatter = new Intl.RelativeTimeFormat('de-DE', {
    numeric: 'auto',
    style: 'narrow',
})

const DIVISIONS = [
    {amount: 60, name: 'seconds'},
    {amount: 60, name: 'minutes'},
    {amount: 24, name: 'hours'},
    {amount: 7, name: 'days'},
    {amount: 4.34524, name: 'weeks'},
    {amount: 12, name: 'months'},
    {amount: Number.POSITIVE_INFINITY, name: 'years'}
];

export default function SonarPage() {

    const {settings} = useSettingsContext();
    const [isConnected, setIsConnected] = useState(sonarSocket.connected);
    const [data, setData] = useState<SensorData[]>([]);

    const getMaxVolumeLiter = () => {
        const maxDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight;

        return Number((maxDistance * Math.PI * Math.pow(settings.radius, 2)) / 1000).toFixed(2);
    }

    const getVolumeLiter = (distance: number) => {
        let realDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight - (distance - settings.maxWaterHeight);

        return Number((realDistance * Math.PI * Math.pow(settings.radius, 2)) / 1000).toFixed(2)

    }


    function formatTimeAgo(date) {
        let duration = (date - new Date().getTime()) / 1000

        for (let i = 0; i < DIVISIONS.length; i++) {
            const division = DIVISIONS[i]
            if (Math.abs(duration) < division.amount) {
                return formatter.format(Math.round(duration), division.name as "year" | "years" | "quarter" | "quarters" | "month" | "months" | "week" | "weeks" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds")
            }
            duration /= division.amount
        }
    }

    const etaEmpty = () => {
        const averageDistance = data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length;
        let realDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight - (averageDistance - settings.maxWaterHeight);
        return formatTimeAgo(new Date().getTime() + (realDistance / AVERAGE_WATER_USAGE_PER_MINUTE) * 60000) ?? 'NaN';
    }


    const etaFull = () => {
        const averageDistance = data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length;
        const maxRealDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight;
        let realDistance = maxRealDistance - (averageDistance - settings.maxWaterHeight);
        return formatTimeAgo(new Date().getTime() + ((maxRealDistance - realDistance) / AVERAGE_WATER_FILL_PER_MINUTE) * 60000) ?? 'NaN';
    }

    const realDistance = () => {
        const averageDistance = data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length;
        return settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight - (averageDistance - settings.maxWaterHeight);
    }

    const invertedrealDistance = () => {
        const maxRealDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight;
        return maxRealDistance - realDistance();
    }

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

        sonarSocket.on('connect', onConnect);
        sonarSocket.on('disconnect', onDisconnect);
        sonarSocket.on('distance', onSensorDataEvent);

        return () => {
            sonarSocket.off('connect', onConnect);
            sonarSocket.off('disconnect', onDisconnect);
            sonarSocket.off('distance', onSensorDataEvent);
        };
    });

    useEffect(() => {
        if (data.length === 0) return;

        if (data.length > 99) {
            sonarSocket.disconnect();
            return;
        }
    }, [data]);

    return (
        <div className={"flex flex-col items-center justify-center w-full"}>
            <div className="flex flex-col text-start w-full gap-2"><h1 className="font-medium text-xl dark:text-white">🎉
                Sonar measurements are being taken</h1><p className="text-sm text-gray-600 dark:text-dark-text">Like, lots and lots of
                data. So
                many data!</p></div>
            <button
                className="p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500 self-start mt-2 disabled:bg-red-300"
                disabled={isConnected} onClick={async (event) => {
                setData([]);
                setIsConnected(true);
                await setTimeout(() => {
                    sonarSocket.connect();
                }, 1000);
            }}>Execute
            </button>
            <div className={"flex flex-row w-full mt-4 gap-4 space-between"}>
                <MediumBox heading={"Connection State"} subheading={"Connected/ Disconnected"}
                           value={isConnected ? "Connected" : "Disconnected"}/>
                <MediumBox heading={"Execution Count"} subheading={"till 100"} value={data.length}/>
            </div>
            <div className={"md:flex md:flex-row grid grid-cols-2 w-full mt-4 gap-4 space-between"}>
                <SmallBox heading={"Datetime"} subheading={"100ms"}
                          value={new Date(data[data.length - 1]?.datetime).toJSON()?.slice(11, 23) ?? 'NaN'}/>
                <SmallBox heading={"Trigger Tick"} subheading={"Sensor to Surface"}
                          value={data[data.length - 1]?.sensor.triggerTick ?? 'NaN'}/>
                <SmallBox heading={"Echo Tick"} subheading={"Surface to Sensor"}
                          value={data[data.length - 1]?.sensor.echoTick ?? 'NaN'}/>
                <SmallBox heading={"Difference"} subheading={"Connected/ Disconnected"}
                          value={data[data.length - 1]?.sensor.diff ?? 'NaN'}/>
            </div>
            <div className={"md:flex md:flex-row grid grid-cols-2 w-full mt-4 gap-4 space-between"}>
                <SmallBox heading={"Distance"} subheading={"in cm"}
                           value={Number(data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length).toFixed(2)}/>
                <SmallBox heading={"Volume"} subheading={"in L"}
                           value={getVolumeLiter((data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length))}/>
                <SmallBox heading={"Max Volume"} subheading={"in L"}
                          value={getMaxVolumeLiter()}/>
                <SmallBox heading={"Percentage"} subheading={"in %"}
                          value={Number(100 / +getMaxVolumeLiter() * +getVolumeLiter((data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length))).toFixed(2)}/>
            </div>
            <div className={"md:flex md:flex-row grid grid-cols-2 w-full mt-4 gap-4 space-between"}>
                <MediumBox heading={"ETA Empty"} subheading={"remaining time"}
                           value={etaEmpty()}/>
                <MediumBox heading={"ETA Full"} subheading={"remaining time"} value={etaFull()}/>
            </div>
            <div className={"md:flex md:flex-row grid grid-cols-2 w-full mt-4 gap-4 space-between"}>
                <MediumBox heading={"Real Distance"} subheading={"Max: " + (settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight)}
                           value={realDistance()}/>
                <MediumBox heading={"Inverted Real Distance"} subheading={"Max: " + (settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight)}
                           value={invertedrealDistance()}/>
            </div>
        </div>
    );
}
