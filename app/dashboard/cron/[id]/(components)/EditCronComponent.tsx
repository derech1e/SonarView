"use client";
import {useEffect, useState} from "react";
import {InputField} from "@/components/InputField";
import {DayDropSelector, weekDays} from "@/components/DayDropSelector";
import DialogPopup from "@/components/DialogPopup";
import {useFormState, useFormStatus} from "react-dom";
import {updateCron} from "@/app/dashboard/cron/actions";


function SubmitButton() {

    const {pending} = useFormStatus();
    return (
        <button
            className="flex h-8 items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500"
            type={"submit"}
            disabled={pending}
            aria-disabled={pending}>
            Save
        </button>
    )
}


export default function EditCronComponent({data}) {

    const [state, formAction] = useFormState(updateCron, {status: true, message: ""})
    const [error, setError] = useState({isVisible: false, message: ""})


    useEffect(() => {
        if (state.status)
            return;
        setError({isVisible: true, message: state.message})

    }, [state]);


    return (
        <form className={"flex flex-col w-full mt-4 gap-4 space-between"} action={formAction}>
            <InputField id={"id"} label={"ID"} name={"id"} required={false} defaultValue={data._id} type={"text"} readOnly={true} aria-disabled={true}/>
            <label htmlFor={"headlessui-listbox-button-:rb:"} className="text-sm font-medium">
                Weekdays<span className="text-red-500">*</span>
            </label>
            <DayDropSelector selectedDays={weekDays.filter((day) => data.dayOfWeek.includes(day.name))}/>
            <InputField id={"from"} label={"From"} name={"startTime"} required={true} type={"time"} defaultValue={data.startTime}/>
            <InputField id={"to"} label={"To"} name={"endTime"} required={true} type={"time"} defaultValue={data.endTime}/>

            <SubmitButton/>

            {error.isVisible &&
                <DialogPopup initValues={{title: "Failed to update job!", message: error.message, submitText: "Got it!", isVisible: true}} onClose={() => setError({...error, isVisible: false})} />
            }
        </form>
    )
}