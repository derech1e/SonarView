import EditCronComponent from "@/app/dashboard/cron/[id]/(components)/EditCronComponent";

//
// export async function generateStaticParams() {
//     const request = await fetch(`${process.env.BACKEND_URL}/scheduler/jobs`, {
//         next: {
//             tags: ['scheduler'],
//         }
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
//

export default async function EditCronJob({params}) {

    const request = await fetch(`${process.env.BACKEND_URL}/scheduler/jobs/${params.id}`, {
        next: {
            tags: ['scheduler'],
        }
    })

    const data = await request.json();

    if (!request.ok)
        throw new Error(request.statusText);


    return (
        <EditCronComponent data={data}/>
    );
}