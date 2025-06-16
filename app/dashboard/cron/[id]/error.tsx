"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col gap-4 items-center bg-gray-100 dark:bg-gray-800 m-5 p-5 rounded-lg">
            <p className="text-black dark:text-gray-100">Something went wrong while loading this page.</p>
            <button
                onClick={() => reset()}
                className="flex items-center group gap-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-100 rounded-md px-3 py-1.5"
            >
                Try again
            </button>
        </div>
    );
}