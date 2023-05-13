"use client";
import {InputField} from "@/components/InputField";
import React, {ChangeEvent, useState} from "react";
import {defaultSettings, SettingsInterface, useSettingsContext} from "@/components/Context";


export default function Settings() {

    const {settings, setSettings} = useSettingsContext();
    const [hasChanged, setHasChanged] = useState(false);
    const [changes, setChanges] = useState<SettingsInterface>({...settings});

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const updatedChanges = {...changes};
        const {id, value} = event.target;

        if (updatedChanges[id] === undefined || !updatedChanges[id]) {
            if (settings[id].toString() !== value.toString()) {
                updatedChanges[id] = value;
            }
        } else {
            if (settings[id].toString() === value.toString()) {
                delete updatedChanges[id];
            } else {
                updatedChanges[id] = value;
            }
        }
        setChanges(updatedChanges);
        setHasChanged(Object.keys(updatedChanges).length > 0);
    }


    return (
        <div className="order-last min-h-screen w-full md:order-none ml-16 p-6">
            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col text-start w-full gap-2">
                    <h1 className="font-medium text-xl">Sensor measure Settings</h1>
                    <p className="text-sm text-gray-600">Configure the settings for this application</p>
                </div>
                <div className="flex flex-col w-full mt-4 gap-4 space-between">
                    <InputField id={"radius"} label={"Radius (cm)"} required={true} type={"number"}
                                defaultValue={settings.radius} onChange={onChangeHandler}/>
                    <InputField id={"heightAboveGround"} label={"Height above ground (cm)"} required={true}
                                type={"number"}
                                defaultValue={settings.heightAboveGround} onChange={onChangeHandler}/>
                    <InputField id={"maxWaterHeight"} label={"Max. water height (cm)"} required={true} type={"number"}
                                defaultValue={settings.maxWaterHeight} onChange={onChangeHandler}/>
                    <InputField id={"minWaterHeight"} label={"Min. water height (cm)"} required={true} type={"number"}
                                defaultValue={settings.minWaterHeight} onChange={onChangeHandler}/>
                    <div className="flex flex-row justify-end">
                        <button disabled={!hasChanged}
                                className="inline-flex items-center mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                onClick={() => {
                                    setSettings({...changes});
                                    setChanges({...settings});
                                    setHasChanged(false);
                                }}>
                            Save Changes
                        </button>
                    </div>
                </div>
                <div className="flex flex-col text-start w-full gap-2 pt-8"><h1 className="font-medium text-xl">Danger
                    Zone</h1><p className="text-sm text-gray-600">The following actions are destructive and cannot be
                    reversed.</p></div>
                <div className="flex flex-col w-full mt-4 gap-4 items-start">
                    <button
                        className="inline-flex items-center mt-6 px-4 py-2  border-2 border-red-600 text-sm font-medium rounded-md shadow-sm text-red-800 bg-transparent hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:text-white"
                        onClick={() => {
                            if (confirm("Do you really want to reset the settings? This action cannot be undone.")) {
                                setSettings(defaultSettings);
                                window.location.reload();
                            }
                        }}>Reset
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
}