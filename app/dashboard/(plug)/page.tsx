import {PlugSwitch} from "@/components/PlugSwitch";

export async function PlugControl() {

    async function getPlugStatus() {
        const response = await fetch("http://pi.de:3000/plug/status",
            {
                next: {
                    revalidate: 0,
                }
            });

        if (!response.ok) {
            return Promise.reject("Failed to fetch (plug) status");
        }
        return await response.json();
    }


    const plugStatus = await getPlugStatus().catch(() => false);

    if (!plugStatus) {
        return (
            <p>Something went wrong while loading this page.</p>
        )
    }


    return (
        <PlugSwitch defaultState={(await getPlugStatus()).POWER1 == 'ON'}/>
    );
}