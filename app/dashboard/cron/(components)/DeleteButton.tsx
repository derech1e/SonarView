"use client";

import {useRouter} from "next/navigation";

export function DeleteButton({id}) {

    const router = useRouter();
    const handleDelete = async () => {
        await fetch(`/api/cron?id=${id}`, {
            method: "DELETE",
        });
        router.refresh();
    }

    return (
        <button type="button"
                className="text-red-600 hover:text-red-900 p-1 focus:outline-red-500"
                onClick={handleDelete}>
            Delete
        </button>
    );
}