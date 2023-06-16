"use client";

import {useState} from "react";

export default function Error({reset}: { error: Error; reset: () => void }) {

    return (
        <div className="flex flex-col gap-4 items-center bg-gray-100 m-5 p-5 rounded-lg">
            <p>Something went wrong while loading this page.</p>
            <button onClick={() => reset()} className={"flex items-center group gap-2 bg-gray-200 text-black rounded-md px-3 py-1.5"}>
                Try again
            </button>
        </div>
    )
}