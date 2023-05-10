"use client"
import {useState} from "react";
import {Switch} from "@headlessui/react";
import {useRouter} from "next/navigation";


export function ToggleSwitch({isActive, id}) {
    const [enabled, setEnabled] = useState(isActive)
    const router = useRouter();

    return (
        <Switch
            checked={enabled}
            onChange={newState => {
                fetch(`/api/cron?id=${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        isActive: newState
                    }),
                }).then(r => {
                    if (r.ok) {
                        setEnabled(newState)
                        router.refresh();
                    }
                });
            }}
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