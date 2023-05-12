"use client";
import {InputField} from "@/components/InputField";
import React, {useContext, useState} from "react";
import SiteContext from "@/components/Context";


export default function Settings() {

    const {diameter, heightAboveGround, maxWaterHeight, minWaterHeight} = useContext(SiteContext);

    return (
        <div className="order-last min-h-screen w-full md:order-none ml-16 p-6">
            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col text-start w-full gap-2">
                    <h1 className="font-medium text-xl">Sensor measure Settings</h1>
                    <p className="text-sm text-gray-600">Configure the settings for this application</p>
                </div>
                <div className="flex flex-col w-full mt-4 gap-4 space-between">
                    <InputField id={"Diameter"} label={"Diameter"} required={true} type={"number"} defaultValue={diameter}/>
                    <InputField id={"SensorHeight"} label={"Height above ground"} required={true} type={"number"} />
                    <InputField id={"MaxWaterHeight"} label={"Max. water height"} required={true} type={"number"} />
                    <InputField id={"MinxWaterHeight"} label={"Min. water height"} required={true} type={"number"} />
                    <div className="flex flex-row justify-end">
                        <button disabled
                                className="inline-flex items-center mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Save Changes
                        </button>
                    </div>
                </div>
                <div className="flex flex-col text-start w-full gap-2 pt-8"><h1 className="font-medium text-xl">Danger
                    Zone</h1><p className="text-sm text-gray-600">The following actions are destructive and cannot be
                    reversed.</p></div>
                <div className="flex flex-col w-full mt-4 gap-4 items-start">
                    <button
                        className="inline-flex items-center mt-6 px-4 py-2  border-2 border-red-600 text-sm font-medium rounded-md shadow-sm text-red-800 bg-transparent hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:text-white">Reset Settings
                    </button>
                </div>
            </div>
        </div>
    );
}