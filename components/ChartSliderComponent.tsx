"use client";
import {useSettingsContext} from "@/components/Context";

export function ChartSliderComponent() {

    const {settings, setSettings} = useSettingsContext();

    return (
        <p>
            <label htmlFor={"rangeSlider"}>Range: {settings.range} Hours</label>
            <input id={"rangeSlider"} type={"range"} defaultValue={settings.range}
                   onChange={(e) => setSettings({...settings, range: e.target.valueAsNumber})}/>
        </p>
    );
}