import Link from "next/link";
import {ToggleSwitch} from "@/components/ToggleSwitch";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {revalidatePath} from "next/cache";
import {DeleteButton} from "@/app/dashboard/cron/(components)/DeleteButton";

export function JobTable({initialData}) {

    return (
        <div className={"dark:text-white"}>
            <div className="flex flex-row w-full gap-4 space-between overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 overflow-y-auto">
                    <thead>
                    <tr>
                        <th scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-dark-text sm:pl-6 lg:pl-8">ID
                        </th>
                        <th scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-dark-text">Weekdays
                        </th>
                        <th scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-dark-text">Timespan
                        </th>
                        <th scope="col" className="relative"><span className="sr-only">Roll / Delete</span></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white ">
                    {
                        initialData.length > 0 && initialData.map((job) => {
                            return (
                                <tr key={job._id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 w-1/2">
                                        <Link className="flex grow hover:underline"
                                              href={`/dashboard/cron/${job._id}`}>{job._id}</Link>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.dayOfWeek.join(", ")}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.startTime} - {job.endTime}</td>
                                    <td className="flex relative whitespace-nowrap py-4 items-end text-sm font-medium gap-2">
                                        <ToggleSwitch isActive={job.isActive} id={job._id}/>
                                        <DeleteButton id={job._id}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

            </div>
            {initialData.length == 0 &&
                <div className="flex flex-col items-center justify-center w-full py-24 border-t"><h1
                    className="font-medium text-xl">No cron jobs exists yet</h1>
                    <p className="text-sm text-gray-600 dark:text-dark-text">Create a new job to get started!</p>
                </div>
            }
        </div>
    );
}