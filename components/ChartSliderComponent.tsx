"use client";
import {useSettingsContext} from "@/components/Context";
import {useState} from "react";

export function ChartSliderComponent() {

    const {settings, setSettings} = useSettingsContext();
    const [displayRange, setDisplayRange] = useState(settings.range);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    return (
        <div className="flex md:flex-row flex-col w-full gap-2 p-4 bg-gray-100 rounded-lg mt-6 dark:bg-dark-accent">
            <div className="flex flex-col">
                <h1 className="font-medium text-xl dark:text-white">Chart Range</h1>
                <p className="text-sm text-gray-600 dark:text-dark-text">Set the window size of the chart data
                    below.</p>
            </div>
            <div className={"flex flex-row items-center justify-between w-full"}>
                <label htmlFor={"rangeSlider"}
                       className={"whitespace-nowrap mr-5 block w-8 dark:text-white"}>{displayRange} h</label>
                <input id={"rangeSlider"}
                       className={"w-full h-2 range-lg bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"}
                       type={"range"} min={1} max={168} defaultValue={displayRange}
                       onChange={(e) => {
                           setDisplayRange(e.target.valueAsNumber);
                           if (timer) {
                               clearTimeout(timer);
                               setTimer(null);
                           }
                           setTimer(setTimeout(() => {
                               setSettings({
                                   ...settings,
                                   range: e.target.valueAsNumber
                               });
                           }, 500));
                       }}/>
            </div>
        </div>
    );
}