import {ToggleSwitch} from "@/app/dashboard/(components)/ToggleSwitch";

export default async function CronPage() {

    const request = await fetch("http://pi.de:3000/scheduler/jobs", {
        next: {revalidate: 10}
    })

    const data = await request.json();

    if (!request.ok)
        throw new Error('Failed to fetch data');

    return (
        <div className={"flex flex-col items-center justify-center w-full"}>
            <div className="flex flex-col text-start w-full gap-2"><h1 className="font-medium text-xl">🎉
                Congratulations,
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                you've got a place to store files!</h1><p className="text-sm text-gray-600">Like, lots and lots of
                files. So
                many files!</p></div>
            <div
                className="flex flex-col rounded-lg h-96 border border-gray-200 w-full mt-4 gap-4 space-between divide-y divide-gray-200">
                <div className="flex flex-row w-full px-6 pt-6 pb-2 gap-4 justify-between">
                    <div className="flex flex-col"><h2 className="font-medium text-lg">All jobs</h2><p
                        className="text-sm text-gray-600">These jobs based on their configuration</p>
                    </div>
                    <button
                        className="flex h-8 items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500">Create
                        Job
                    </button>
                </div>
                <div className="flex flex-row w-full gap-4 space-between overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">ID
                            </th>
                            <th scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Weekdays
                            </th>
                            <th scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Timespan
                            </th>
                            <th scope="col" className="relative"><span className="sr-only">Roll / Delete</span></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white ">
                        {
                            data.map((job) => {
                                return (
                                    <tr key={job._id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 w-1/2">
                                            <span className="flex grow">{job._id}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 group flex gap-2 ">{job.dayOfWeek.join(", ")}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.startTime} - {job.endTime}</td>
                                        <td className="flex relative whitespace-nowrap py-4 items-end text-sm font-medium gap-2">
                                            <ToggleSwitch isActive={true} />
                                            <button type="button"
                                                    className="text-red-600 hover:text-red-900 p-1 focus:outline-red-500">Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}