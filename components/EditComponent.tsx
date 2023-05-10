"use client";
import {InputField} from "@/components/InputField";
import {DayDropSelector, weekDays} from "@/components/DayDropSelector";
import {Fragment, useState} from "react";
import {useRouter} from "next/navigation";
import {Dialog, Transition} from "@headlessui/react";

export function EditComponent({data}) {
    const [isOpen, setIsOpen] = useState(false);
    const [dataState, setDataState] = useState(data);
    const router = useRouter();


    function closeModal() {
        setIsOpen(false)
        router.push("/dashboard/cron", {
            forceOptimisticNavigation: true
        })
        router.refresh();
    }

    return (
        <div className={"flex flex-col w-full mt-4 gap-4 space-between"}>
            <InputField id={"id"} label={"ID"} required={false} value={data._id} type={"text"}
                        disabled/>
            <label htmlFor={"headlessui-listbox-button-:rb:"} className="text-sm font-medium">Weekdays
                <span className="text-red-500">*</span>
            </label>
            <DayDropSelector selectedDays={weekDays.filter((day) => dataState.dayOfWeek.includes(day.name))}
                             dayNames={(names) => {
                                 setDataState({...dataState, dayOfWeek: names})
                                 console.log(names)
                             }}/>
            <InputField id={"from"} label={"From"} required={true} type={"time"} defaultValue={dataState.startTime}
                        onClick={(event) => {
                            event.currentTarget.showPicker();
                        }}
                        onChange={(event) => {
                            console.log(event.target.value)
                            console.log(dataState)
                            setDataState({...dataState, startTime: event.target.value})
                        }}
            />
            <InputField id={"to"} label={"To"} required={true} type={"time"} defaultValue={dataState.endTime}
                        onClick={(event) => {
                            event.currentTarget.showPicker();
                        }}
                        onChange={(event) => {
                            setDataState({...dataState, endTime: event.target.value})
                        }}
            />
            <button
                className="flex h-8 items-center justify-center p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-red-500"
                onClick={() => {
                    fetch(`/api/cron?id=${data._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            dayOfWeek: dataState.dayOfWeek,
                            startTime: dataState.startTime,
                            endTime: dataState.endTime,
                            isActive: true,
                        })
                    }).then((response) => {
                        if(response.status == 200) {
                            setIsOpen(true)
                        } else {
                            throw new Error("Failed to update job");
                        }
                    })
                }}>Save
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Updated Job successful
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            The job has been updated successfully.
                                            It will be executed within the next minute.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}