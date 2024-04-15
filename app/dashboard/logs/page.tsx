export default async function Logs() {

    const request = await fetch(`${process.env.BACKEND_URL}/logs`, {
        next: {
            revalidate: 30,
        }
    });

    const data = await request.json();

    if (!request.ok)
        throw new Error('Failed to fetch logs' + await request.json());

    const logTypComponent = (logTyp) => {
        if (logTyp === "DEBUG") {
            return (
                <div
                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gray-100 text-gray-700 dark:bg-gray-300 dark:text-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 mr-1.5 -translate-y-0.5"
                    >
                        <path d="m8 2 1.88 1.88"></path>
                        <path d="M14.12 3.88 16 2"></path>
                        <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
                        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
                        <path d="M12 20v-9"></path>
                        <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
                        <path d="M6 13H2"></path>
                        <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
                        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
                        <path d="M22 13h-4"></path>
                        <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
                    </svg>
                    DEBUG
                </div>
            )
        } else if (logTyp === "INFO") {
            return (
                <div
                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-100 text-blue-700 dark:bg-blue-300 dark:text-blue-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4 mr-1.5 -translate-y-0.5"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    INFO
                </div>
            )
        } else if (logTyp === "WARNING") {
            return (
                <div
                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-300 dark:text-yellow-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4 mr-1.5 -translate-y-0.5"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" x2="12" y1="8" y2="12"></line>
                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    WARNING
                </div>
            )
        } else if (logTyp === "ERROR") {
            return (
                <div
                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-100 text-red-700 dark:bg-red-300 dark:text-red-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4 mr-1.5 -translate-y-0.5"
                    >
                        <path
                            d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                    </svg>
                    ERROR
                </div>
            )
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Date
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Module
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Action
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Details
                        </th>
                    </tr>
                    </thead>
                    <tbody className="[&amp;_tr:last-child]:border-0">
                    {
                        data.map((item, idx) => {
                            return (
                                <tr key={idx}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                        <time className="text-sm font-medium text-gray-500 dark:text-gray-400"
                                              dateTime={item.createdAt}>
                                            {item.createdAt}
                                        </time>
                                    </td>
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{item.module}</td>
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{item.action}</td>
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                        {
                                            logTypComponent(item.logTyp)
                                        }
                                    </td>
                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                        {item.message}
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}