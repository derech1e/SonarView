"use client";
import {useSelectedLayoutSegment} from "next/navigation";


function getCronSubTitle(segment) {
    switch (segment) {
        case 'new':
            return "Create a new Cronjob!";
        case null:
            return "An overview off all existing cron jobs";
        default:
            return "Edit the execution time of the current Cronjob!";
    }
}

export default function CronJobHeader() {

    const segment = useSelectedLayoutSegment();

    return (
        <div className="flex flex-col text-start w-full gap-2">
            <h1 className="font-medium text-xl dark:text-white">🎉 Cron Job Manager</h1>
            <p className="text-sm text-gray-600 dark:text-dark-text">{getCronSubTitle(segment)}</p>
        </div>
    );
}