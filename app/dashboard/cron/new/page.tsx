"use client";
import { useFormState, useFormStatus } from "react-dom";
import { createCron } from "@/app/dashboard/cron/actions";
import { DayDropSelector } from "@/components/DayDropSelector";
import { InputField } from "@/components/InputField";
import { useEffect, useState } from "react";
import DialogPopup from "@/components/DialogPopup";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className="flex h-8 items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={pending}
            aria-disabled={pending}
        >
            Create job
        </button>
    );
}

export default function CreateCronJob() {
    const [state, formAction] = useFormState(createCron, { status: true, message: "" });
    const [error, setError] = useState({ isVisible: false, message: "" });

    useEffect(() => {
        if (state.status) return;
        setError({ isVisible: true, message: state.message });
    }, [state]);

    return (
        <form className="flex flex-col w-full mt-4 gap-4 space-between" action={formAction}>
            <label htmlFor="headlessui-listbox-button-:rb:" className="text-sm font-medium text-black dark:text-gray-100">
                Weekdays <span className="text-red-500">*</span>
            </label>
            <DayDropSelector selectedDays={undefined} dayNames={undefined} />
            <InputField id="from" label="From" name="startTime" required type="time" />
            <InputField id="to" label="To" name="endTime" required type="time" />
            <SubmitButton />
            {error.isVisible && (
                <DialogPopup
                    initValues={{
                        title: "Failed to create job!",
                        message: error.message,
                        submitText: "Got it!",
                        isVisible: true,
                    }}
                    onClose={() => setError({ ...error, isVisible: false })}
                />
            )}
        </form>
    );
}