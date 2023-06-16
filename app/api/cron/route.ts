import {NextRequest, NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

export async function GET(request: NextRequest) {
    const response = await fetch(process.env.BACKEND_URL + "/scheduler/jobs", {
        cache: "no-store",
    });
    return NextResponse.json(await response.json());
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    if (body === null || body === undefined) return NextResponse.json({"error": "id or body is null"});


    const response = await fetch(process.env.BACKEND_URL + '/scheduler/jobs/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if(response.status > 201) return NextResponse.json({"error": await response.json()}, {status: response.status, statusText: response.statusText})
    const data = await response.json();
    revalidateTag("scheduler")
    return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    const body = await request.json();

    if (id == null || body === null || body === undefined) return NextResponse.json({"error": "id or body is null"});


    const response = await fetch(`${process.env.BACKEND_URL}/scheduler/jobs/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if(response.status !== 200) return NextResponse.json({"error": response.statusText}, {status: response.status, statusText: response.statusText})
    const data = await response.json();
    revalidateTag("scheduler")
    return NextResponse.json(data);
}


export async function PATCH(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    const body = await request.json();

    if (id == null || body === null || body === undefined) return NextResponse.json({"error": "id or body is null"});


    const response = await fetch(`${process.env.BACKEND_URL}/scheduler/jobs/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isActive: body.isActive,
        }),
    });
    const data = await response.json();
    revalidateTag("scheduler")
    return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    if (id == null) return NextResponse.json({"error": "id is null"});


    const response = await fetch(`${process.env.BACKEND_URL}/scheduler/jobs/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    revalidateTag("scheduler")
    return NextResponse.json(data);
}