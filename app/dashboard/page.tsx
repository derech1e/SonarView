import {Suspense} from "react";
import {LoadingComponent} from "@/components/LoadingComponent";
import {PlugControl} from "@/app/dashboard/(plug)/plug";
import {ChartWrapper} from "@/components/ChartWrapper";

export default function DashboardPage() {

    return (
        <div className={"w-full h-screen"}>
            <div className="flex flex-col text-start w-full gap-2">
                <h1 className="font-medium text-xl dark:text-white">Overview</h1>
                <p className="text-sm text-gray-600 dark:text-dark-text">View and manage the Cistern!</p>
            </div>
            <div className="flex flex-col w-full gap-2 p-4 bg-gray-100 rounded-lg mt-6 dark:bg-dark-accent">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col text-start w-full gap-2">
                        <h1 className="font-medium text-xl dark:text-white">Plug Control</h1>
                        <p className="text-sm text-gray-600 dark:text-dark-text">Quickly turn on/ off the plug</p>
                    </div>
                    <Suspense fallback={<LoadingComponent size={"48"}/>}>
                        <PlugControl/>
                    </Suspense>
                </div>
            </div>
            <Suspense
                fallback={<div className={"w-full flex justify-center mt-10"}><LoadingComponent size={"48"}/></div>}>
                <ChartWrapper/>
            </Suspense>
        </div>
    )
}