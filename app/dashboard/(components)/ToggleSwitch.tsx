"use client"
import {useState} from "react";
import {Switch} from "@headlessui/react";

export function ToggleSwitch({isActive}) {
    const [enabled, setEnabled] = useState(isActive)

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? 'bg-red-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full mb-0.5`}
        >
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}