"use client";
import {InputField} from "@/app/dashboard/cron/[id]/(components)/InputField";
import {DayDropSelector, weekDays} from "@/app/dashboard/cron/[id]/(components)/DayDropSelector";

export function EditComponent({data}) {
    const selectedDays = weekDays.filter((day) => data.dayOfWeek.includes(day.name));

    return (
        <div className={"flex flex-col w-full mt-4 gap-4 space-between"}>
            <InputField id={"id"} label={"ID"} required={false} value={data._id} type={"text"}
                        disabled/>
            <label htmlFor={"headlessui-listbox-button-:rb:"} className="text-sm font-medium">Weekdays
                <span className="text-red-500">*</span>
            </label>
            <DayDropSelector selectedDays={selectedDays}/>
            <InputField id={"from"} label={"From"} required={true} type={"time"} defaultValue={data.startTime} onClick={(event) => {
                event.currentTarget.showPicker();
            }}/>
            <InputField id={"to"} label={"To"} required={true} type={"time"} defaultValue={data.endTime} onClick={(event) => {
                event.currentTarget.showPicker();
            }}/>
        </div>
    )
}