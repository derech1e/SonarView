"use client"
import {useState} from "react";
import {Switch} from "@headlessui/react";
import {LoadingComponent} from "@/components/LoadingComponent";

export function PlugSwitch({defaultState}) {
    const [enabled, setEnabled] = useState(defaultState);

    const [isLoading, setIsLoading] = useState(false);

    async function handleChange(newState) {
        setIsLoading(true);
        await fetch("/api/plug", {
            method: "PATCH",
            body: JSON.stringify({
                POWER1: false,
            }),
        }).then((res) => {
            if (res.status === 200) {
                setEnabled(newState);
            }
            setIsLoading(false);
        });
    }

    return (
        <div className={"flex flex-row items-center"}>
            {isLoading &&
            <LoadingComponent size={32}/>}
            <Switch
                disabled={isLoading}
                checked={enabled}
                onChange={handleChange}
                className={`${
                    enabled ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-500'
                } disabled:opacity-50 relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Enable Pump Plug</span>
                <span
                    className={`${
                        enabled ? 'translate-x-9' : 'translate-x-0'
                    } disabled:opacity-50 pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    )
}