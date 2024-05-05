"use server";

import {redirect} from "next/navigation";

export async function createCron(prevState: {
    status: boolean,
    message: string,
}, formData: FormData) {

    await new Promise(resolve => setTimeout(resolve, 250));
    const parsedData: string[] = [];
    formData.forEach((value, key) => {
        if (key.includes("dayOfWeek") && key.includes("name")) {
            parsedData.push(value.toString())
        }
    })

    const response = await fetch(`${process.env.HOST_URL}/api/cron`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dayOfWeek: parsedData,
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime')
        })
    })

    if (response.ok) {
        redirect("/dashboard/cron")
        // return {status: true, message: "Created cron successfully!"}
    } else {
        const msg = await response.json();
        return {status: false, message: JSON.stringify(msg.error.message)}
    }
}

export async function updateCron(prevState: {
    status: boolean,
    message: string,
}, formData: FormData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const parsedData: string[] = [];
    formData.forEach((value, key) => {
        if (key.includes("dayOfWeek") && key.includes("name")) {
            parsedData.push(value.toString())
        }
    })

    const response = await fetch(`${process.env.HOST_URL}/api/cron?id=${formData.get('id')}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dayOfWeek: parsedData,
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime'),
            isActive: true,
        })
    })
    if (response.ok) {
        redirect("/dashboard/cron")
        // return {status: true, message: "Created cron successfully!"}
    } else {
        const msg = await response.json();
        return {status: false, message: JSON.stringify(msg.error.message)}
    }
}