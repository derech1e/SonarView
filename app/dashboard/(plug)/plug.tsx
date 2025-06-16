import {PlugSwitch} from "@/components/PlugSwitch";

export const dynamic = 'force-dynamic';

async function getPlugStatus() {
    const response = await fetch("http://pi.de:3000/plug/status", {
        cache: "no-store", // Correct placement
        headers: {
            cache: "no-store",
        }
    });
    if (!response.ok) {
        return Promise.reject("Failed to fetch (plug) status");
    }
    return await response.json();
}

export default async function PlugControl() {

    const plugStatus = await getPlugStatus();

    if (plugStatus == null) {
        return (
            <p>Something went wrong while loading this page.</p>
        )
    }


    return (
        <PlugSwitch defaultState={plugStatus.POWER1 == 'ON'}/>
    );
}