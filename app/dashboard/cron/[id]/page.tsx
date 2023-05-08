import {EditComponent} from "@/app/dashboard/cron/[id]/(components)/EditComponent";

export default async function CronEdit({params}) {

    const request = await fetch(`http://pi.de:3000/scheduler/jobs/${params.id}`, {
        next: {revalidate: 10}
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