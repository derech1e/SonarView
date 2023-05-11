"use client";


import {RadioGroup} from "@headlessui/react";

export const durations = [
    {
        name: '1 min',
        seconds: 60,
    },
    {
        name: '5 min',
        seconds: 5 * 60,
    },
    {
        name: '10 min',
        seconds: 10 * 60,
    },
    {
        name: '15 min',
        seconds: 15 * 60,
    },
    {
        name: '20 min',
        seconds: 20 * 60,
    },
    {
        name: '30 min',
        seconds: 30 * 60,
    },
    {
        name: '45 min',
        seconds: 45 * 60,
    },
    {
        name: '60 min',
        seconds: 60 * 60,
    },
]

export function DurationRadioGroup({selectedDuration, setSelectedDuration}) {
    return (
            <div className="mt-5 w-full max-w-md absolute">
                <RadioGroup value={selectedDuration} onChange={setSelectedDuration} >
                    <div className="space-2 grid grid-cols-2 gap-2 whitespace-nowrap">
                        {durations.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                    `${
                                        active
                                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-red-700'
                                            : ''
                                    }
                  ${
                                        checked ? 'bg-red-700 bg-opacity-90 text-white' : 'bg-white'
                                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${
                                                            checked ? 'text-white' : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {plan.name}
                                                    </RadioGroup.Label>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}