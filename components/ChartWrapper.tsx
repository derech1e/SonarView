import {use} from "react";
import {ChartSliderComponent} from "@/components/ChartSliderComponent";
import {ChartView} from "@/components/ChartView";

export function ChartWrapper() {

    async function getMeasurementData() {
        // await new Promise(resolve => setTimeout(resolve, 5000));
        const response = await fetch(`http://pi.de:3000/sensor`,
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

    const measurementData = use(getMeasurementData().catch(() => null))

    if (measurementData == null) {
        return (
            <p className={"my-5"}>Failed to fetch measurements.</p>
        )
    }

    return (
        <>
            <ChartSliderComponent/>
            <div className={"mt-5 -ml-10"}>
                <ChartView data={measurementData}/>
            </div>
        </>
    )

}