import {ChartView} from "@/components/ChartView";
import {Suspense} from "react";
import {LoadingComponent} from "@/components/LoadingComponent";
import {PlugSwitch} from "@/components/PlugSwitch";
import {ChartSliderComponent} from "@/components/ChartSliderComponent";


export interface SensorData {
    datetime: Date;
    distance: number;
}


function movingAverage(data: SensorData[], windowSize) {
    const smoothedData: any = [];
    for (let i = 0; i < data.length; i++) {
        let sum = 1;
        let count = 0;
        for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
            sum += data[j].distance;
            count++;
        }
        smoothedData.push({datetime: data[i].datetime, distance: Number(sum / count).toFixed(2)});
    }
    return smoothedData;
}

function removeOutliers(data: SensorData[]) {
    const sortedData = data.sort((a, b) => a.distance - b.distance);
    const q1 = sortedData[Math.floor((sortedData.length - 1) * 0.25)];
    const q3 = sortedData[Math.floor((sortedData.length - 1) * 0.75)];
    const iqr = q3.distance - q1.distance;
    const lowerBound = q1.distance - (10 * iqr);
    const upperBound = q3.distance + (10 * iqr);
    return data.filter((value) => value.distance >= lowerBound && value.distance <= upperBound);
}

function removeHardOutliers(data: SensorData[], threshold = 3.5) {
    const sortedData = data.sort((a, b) => a.distance - b.distance);
    const q1 = sortedData[Math.floor((sortedData.length - 1) * 0.25)];
    const q3 = sortedData[Math.floor((sortedData.length - 1) * 0.75)];
    const iqr = q3.distance - q1.distance;
    const median = sortedData[Math.floor((sortedData.length - 1) / 2)];
    const mad = sortedData.reduce((sum, value) => sum + Math.abs(value.distance - median.distance), 0) / sortedData.length;
    return data.filter((value) => {
        const zScore = 0.6745 * (value.distance - median.distance) / mad; // 0.6745 is a constant for the standard normal distribution
        return Math.abs(zScore) < threshold;
    });
}

function removeHardOutliersInDynamicRange(data: SensorData[], rangeSize, threshold = 3.5) {
    const sortedData = data.sort((a, b) => a.distance - b.distance);
    const median = sortedData[Math.floor(sortedData.length / 2)];
    const mad = sortedData.reduce((sum, value) => sum + Math.abs(value.distance - median.distance), 0) / sortedData.length;

    const cleanedData = [...data];
    for (let i = 0; i < cleanedData.length; i++) {
        if (i < rangeSize / 2 || i > cleanedData.length - rangeSize / 2 - 1) {
            // Skip first and last few values where range cannot be calculated
            continue;
        }

        // Calculate current range start and end indices
        const rangeStart = i - Math.floor(rangeSize / 2);
        let rangeEnd = i + Math.ceil(rangeSize / 2) - 1;
        const rangeData = cleanedData.slice(rangeStart, rangeEnd + 1);
        const sortedRangeData = rangeData.sort((a, b) => a.distance - b.distance);
        const q1 = sortedRangeData[Math.floor((sortedRangeData.length - 1) * 0.25)];
        const q3 = sortedRangeData[Math.floor((sortedRangeData.length - 1) * 0.75)];
        const iqr = q3.distance - q1.distance;
        const median = sortedRangeData[Math.floor((sortedRangeData.length - 1) / 2)];

        for (let j = rangeStart; j <= rangeEnd; j++) {
            if (Math.abs(cleanedData[j].distance - median.distance) > threshold * mad) {
                // Remove data point outside threshold
                cleanedData.splice(j, 1);
                j--; // Decrement index to account for removed value
                rangeEnd--; // Decrement range end to account for removed value
            }
        }
    }
    return cleanedData;
}

function reduceData(data: SensorData[]): SensorData[] {
    const reducedData: SensorData[] = [];

    let currentDistance: number = -1;
    let currentCount = 0;
    let futureCount = 0;

    for (let i = 0; i < data.length; i++) {
        if (currentDistance === -1) {
            currentDistance = parseFloat(data[i].distance.toFixed(2));
            currentCount++;
            continue;
        }

        const roundedDistance = parseFloat(data[i].distance.toFixed(2));

        if (roundedDistance === currentDistance) {
            currentCount++;
            futureCount++;
            if (futureCount >= 19) {
                reducedData.push({datetime: data[i - futureCount + 1].datetime, distance: currentDistance});
                futureCount = 0;
            }
        } else {
            reducedData.push({datetime: data[i == 0 ? 0 : i - 1].datetime, distance: currentDistance});
            reducedData.push({datetime: data[i].datetime, distance: roundedDistance});

            currentDistance = roundedDistance;
            currentCount = 1;
            futureCount = 0;
        }
    }

    if (futureCount >= 19) {
        reducedData.push({datetime: data[data.length - futureCount].datetime, distance: currentDistance});
    }

    return reducedData;
}


function reduceSensorData(data: SensorData[], windowSize: number): SensorData[] {
    // Copy the input data to avoid modifying it
    const reducedData: SensorData[] = [...data];

    // Use a sliding window approach to reduce the data
    let currentDistance: number | null = null;
    let currentCount = 0;
    for (let i = 0; i < reducedData.length; i++) {
        const windowStart = Math.max(0, i - windowSize + 1);
        const windowEnd = i;
        const windowData = reducedData.slice(windowStart, windowEnd + 1);

        // Calculate the average distance for the current window
        const averageDistance = windowData.reduce((sum, d) => sum + d.distance, 0) / windowData.length;
        const roundedAverageDistance = parseFloat(averageDistance.toFixed(2));

        // If the current distance value is the same as the previous value, increment the count
        if (currentDistance === roundedAverageDistance) {
            currentCount++;
        } else {
            currentDistance = roundedAverageDistance;
            currentCount = 1;
        }

        // Replace the distance value for the current data point with the rounded average distance
        if (currentCount <= 20) {
            reducedData[i] = {
                datetime: reducedData[i].datetime,
                distance: parseFloat(reducedData[i].distance.toFixed(2)),
            };
        } else {
            // Remove the current data point if it is a duplicate of the previous 20 data points
            reducedData.splice(i, 1);
            i--;
        }
    }

    return reducedData;
}


async function getPlugStatus() {
    'use server';
    new Promise(resolve => setTimeout(resolve, 15000));
    const response = await fetch("http://pi.de:3000/plug/status",
        {
            next: {
                revalidate: 0,
            }
        });

    if (!response.ok) {
        throw new Error("Failed to fetch plug status");
    }
    return await response.json();
}


async function getMeasurementData() {
    'use server';
    new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch("http://192.168.200.193:3000/sensor",
        {
            next: {
                revalidate: 60,
            }
        });

    if (!response.ok) {
        throw new Error("Failed to fetch measurements");
    }
    return await response.json();

}


export default async function DashboardPage() {

    return (
        <div className={"w-full h-screen"}>
            <div className="flex flex-col text-start w-full gap-2">
                <h1 className="font-medium text-xl dark:text-white">Overview</h1>
                <p className="text-sm text-gray-600 dark:text-dark-text">View and manage the Cistern!</p>
            </div>
            <div className="flex flex-col w-full gap-2 p-4 bg-gray-100 rounded-lg mt-6 dark:bg-dark-accent">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col text-start w-full gap-2">
                        <h1 className="font-medium text-xl dark:text-white">Plug Control</h1>
                        <p className="text-sm text-gray-600 dark:text-dark-text">Quickly turn on/ off the plug</p>
                    </div>
                    <Suspense fallback={<LoadingComponent size={"48"}/>}>
                        <PlugSwitch defaultState={(await getPlugStatus()).POWER1 == 'ON'}/>
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<div className={"w-full h-full flex flex-col items-center mt-10"}><LoadingComponent size={"124"} /></div>}>
                <div className={"mt-5 -ml-10"}>
                    <ChartSliderComponent />
                    <ChartView data={await getMeasurementData()}/>
                </div>
            </Suspense>
        </div>
    )
}