import {PlugSwitch} from "@/components/PlugSwitch";

export default async function DashboardPage() {

    const response = await fetch("http://pi.de:3000/plug/status",
        {
            cache: 'no-store',
            next: {
                revalidate: 0,
            }
        });

    if (!response.ok) {
        throw new Error("Failed to fetch plug status");
    }

    const defaultChecked = await response.json();
    console.log(defaultChecked)

    return (
        <div>
            <div className="flex flex-col text-start w-full gap-2"><h1 className="font-medium text-xl">Overview</h1><p
                className="text-sm text-gray-600">View and manage the Cistern!</p></div>
            <div className="flex flex-col w-full gap-2 p-4 bg-gray-100 rounded-lg mt-6">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col text-start w-full gap-2">
                        <h1 className="font-medium text-xl">Plug Control</h1>
                        <p className="text-sm text-gray-600">Quickly turn on/ off the plug</p>
                    </div>
                    <PlugSwitch defaultState={defaultChecked.POWER1 == 'ON'}/>
                </div>
            </div>
        </div>
    )
}