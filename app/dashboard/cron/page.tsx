import {JobTable} from "@/components/JobTable";
import Link from "next/link";

export default async function CronPage() {
    const request = await fetch("http://pi.de:3000/scheduler/jobs", {
        cache: "no-store",
        next: {
            revalidate: 0,
        }
    });

    const data = await request.json();

    if (!request.ok)
        throw new Error('Failed to fetch data');
    return (
        <div className={"flex flex-col items-center justify-center w-full"}>
            <div
                className="flex flex-col rounded-lg h-96 border border-gray-200 w-full mt-4 gap-4 space-between divide-y divide-gray-200">
                <div className="flex flex-row w-full px-6 pt-6 pb-2 gap-4 justify-between">
                    <div className="flex flex-col">
                        <h2 className="font-medium text-lg dark:text-white">All jobs</h2>
                        <p className="text-sm text-gray-600 dark:text-dark-text">These jobs based on their configuration</p>
                    </div>
                    <Link href="/dashboard/cron/new"
                          className="flex h-8 whitespace-nowrap items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500">Create
                        Job
                    </Link>
                </div>
                <JobTable initialData={data}/>
            </div>
        </div>
    )
}