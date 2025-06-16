import {revalidatePath, revalidateTag} from "next/cache";

export function DeleteButton({id}) {

    const handleDelete = async () => {
        "use server";
        await fetch(`http://pi.de/api/cron?id=${id}`, {
            method: "DELETE",
        });
        revalidateTag("scheduler")
    }

    return (
        <form action={handleDelete}>
            <button type={"submit"}
                    className="text-red-600 hover:text-red-900 p-1 focus:outline-red-500 cursor-pointer">
                Delete
            </button>
        </form>
    );
}