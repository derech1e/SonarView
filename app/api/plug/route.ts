import {NextRequest, NextResponse} from "next/server";

export async function PATCH(request: NextRequest) {
    const body = await request.json();

    if (body === null || body === undefined) return NextResponse.json({"error": "id or body is null"});


    const response = await fetch(`${process.env.BACKEND_URL}/plug/status/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            POWER1: body.POWER1,
        }),
    });
    const data = await response.json();
    return NextResponse.json(data);
}