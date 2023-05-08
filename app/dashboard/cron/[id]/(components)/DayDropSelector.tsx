"use client";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";

export const weekDays = [
    {id: 1, name: "Monday"},
    {id: 2, name: "Tuesday"},
    {id: 3, name: "Wednesday"},
    {id: 4, name: "Thursday"},
    {id: 5, name: "Friday"},
    {id: 6, name: "Saturday"},
    {id: 7, name: "Sunday"},
];

export function DayDropSelector({selectedDays}) {
    const [selectedWeekDays, setSelectedWeekDays] = useState<[{ id: number, name: string }?]>(selectedDays ?? []);

    return (
        // <div className={"w-1"}>
            <Listbox value={selectedWeekDays} onChange={setSelectedWeekDays} multiple>
                <div className="relative">
                    <Listbox.Button
                        className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 border border-gray-200 sm:text-sm">
                            <span
                                className="block truncate">{selectedWeekDays.length > 0 ? selectedWeekDays.sort((a,b) => a!.id - b!.id).map(day => day?.name).join(", ") : "Select weekdays"}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none"
                                     stroke="currentColor">
                                    <path d="M10 14l-5-5m0 0l5-5m-5 5h12" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in-out duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {weekDays.map((day) => (
                                <Listbox.Option key={day.id} value={day} className={({active}) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-red-100 text-red-900' : 'text-gray-900'
                                    }`
                                }>
                                    {({selected}) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {day.name}
                                            </span>
                                            {selected ? (<span
                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">X </span>) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        // </div>
    );
}