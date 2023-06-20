"use client";
import {SmallBox} from "@/components/SmallBox";
import {MediumBox} from "@/components/MediumBox";
import {useEffect, useState} from "react";
import {sonarSocket} from "@/app/socket";
import {CalculationHelper} from "@/utils/CalculationHelper";
import {SensorData} from "@/utils/interface/SensorData";
import {formatTimeAgo} from "@/utils/RelativeTimerHelper";
import {useRouter} from "next/navigation";

export default function SonarPage() {

    const router = useRouter();
    const [isConnected, setIsConnected] = useState(sonarSocket.connected);
    const [data, setData] = useState<SensorData[]>([]);

    const distanceAverage = () => {
        return data.reduce((acc, curr) => (acc ?? 0) + (curr.distance ?? 0), 0) / data.length;
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
            if(data.length >= 99) {
                sonarSocket.disconnect();
            }
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
        sonarSocket.disconnect();
    }, [router]);

    return (
        <div className={"flex flex-col items-center justify-center w-full"}>
            <div className="flex flex-col text-start w-full gap-2">
                <h1 className="font-medium text-xl dark:text-white">🎉
                    Sonar measurements are being taken</h1>
                <p className="text-sm text-gray-600 dark:text-dark-text">Like, lots and lots of data. So many data!</p>
            </div>

            <button
                className="p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500 self-start mt-2 disabled:bg-red-300"
                disabled={isConnected} onClick={async () => {
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
                          value={data[data.length - 1]?.sensor!.triggerTick ?? 'NaN'}/>
                <SmallBox heading={"Echo Tick"} subheading={"Surface to Sensor"}
                          value={data[data.length - 1]?.sensor!.echoTick ?? 'NaN'}/>
                <SmallBox heading={"Difference"} subheading={"Connected/ Disconnected"}
                          value={data[data.length - 1]?.sensor!.diff ?? 'NaN'}/>
            </div>

            <div className={"md:flex md:flex-row grid grid-cols-2 w-full mt-4 gap-4 space-between"}>
                <SmallBox heading={"Distance"} subheading={"in cm"}
                          value={distanceAverage().toFixed(2)}/>
                <SmallBox heading={"Volume"} subheading={"in L"}
                          value={new CalculationHelper(distanceAverage()).getVolumeInLiters()}/>
                <SmallBox heading={"Max Volume"} subheading={"in L"}
                          value={new CalculationHelper().getMaxVolumeInLiters()}/>
                <SmallBox heading={"Percentage"} subheading={"in %"}
                          value={new CalculationHelper(distanceAverage()).asPercent()}/>
            </div>

            <div className={"md:flex md:flex-row grid grid-cols-2 w-full mt-4 gap-4 space-between"}>
                <MediumBox heading={"ETA Empty"} subheading={"remaining time"}
                           value={formatTimeAgo(new CalculationHelper(distanceAverage()).getEstimatedTimeToEmpty())}/>
                <MediumBox heading={"ETA Full"} subheading={"remaining time"}
                           value={formatTimeAgo(new CalculationHelper(distanceAverage()).getEstimatedTimeToFull())}/>
            </div>
        </div>
    );
}
