import {PlugSwitch} from "@/components/PlugSwitch";
import {use} from "react"

export function PlugControl() {

    async function getPlugStatus() {
        const response = await fetch("http://pi.de:3000/plug/status", {
            headers: {
                cache: "no-store",
            }
        });
        if (!response.ok) {
            return Promise.reject("Failed to fetch (plug) status");
        }
        return await response.json();
    }


    const plugStatus = use(getPlugStatus().catch(() => null));

    if (plugStatus == null) {
        return (
            <p>Something went wrong while loading this page.</p>
        )
    }


    return (
        <PlugSwitch defaultState={plugStatus.POWER1 == 'ON'}/>
    );
}