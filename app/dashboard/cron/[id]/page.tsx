import {EditComponent} from "@/components/EditComponent";


// export async function generateStaticParams() {
//     const request = await fetch("http://pi.de:3000/scheduler/jobs", {
//         cache: "no-store",
//     });
//
//     const data = await request.json();
//
//     if (!request.ok)
//         throw new Error('Failed to fetch data');
//
//     return data.map((job) => {
//         return {
//             id: job._id,
//         }
//     });
// }

export default async function CronEdit({params}) {

    const request = await fetch(`http://pi.de:3000/scheduler/jobs/${params.id}`, {
        cache: "no-store",
        next: {
            revalidate: 0,
        }
    })

    const data = await request.json();

    if (!request.ok)
        throw new Error( request.statusText);



    return (
        <div className={"flex flex-col items-center justify-center w-full"}>
            <EditComponent data={data}/>
        </div>
    );
}