"use client";
export default function ErrorTimer() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-center text-red-700">Error</h1>
                <p className="text-center text-gray-600">An error within the timer boundary occurred!</p>
            </div>
        </div>
    )
}