import Link from "next/link";
import {Navigation} from "@/app/dashboard/(components)/NavigationLinks";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {

    const navItems = [
        {name: 'Dashboard', href: ' '},
        {name: 'Sonar', href: 'sonar'},
        {name: 'Cron Jobs', href: 'cron'}
    ];

    return (
        <div className={"h-screen w-screen"}>
            <div className={"h-full w-full"}>
                <div className={"mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"}>
                    <div className={"flex items-center gap-x-4"}>
                        <Link href={"/dashboard"} className={"flex flex-row items-baseline focus:outline-red-500"}>
                            <h1 className="flex flex-row items-baseline text-2xl font-bold relative"><span
                                className="sr-only">SonarView</span><span
                                className="tracking-tight hover:cursor-pointer">sonar<span
                                className="text-red-600">view</span></span><sup
                                className="absolute top-0 left-[calc(100%+.1rem)] text-xs font-bold text-black hidden">[BETA]</sup>
                            </h1>
                        </Link>
                        <span className="text-gray-400 text-5xl font-thin">/</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://docs.uploadthing.com">
                            <div
                                className="flex items-center group gap-2  text-gray-600 hover:bg-gray-200 hover:text-black rounded-md px-3 py-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                                    <path fill="currentColor" fillRule="evenodd"
                                          d="M18 10a8 8 0 1 1-16 0a8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061a3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <span className="text-sm">Help</span></div>
                        </Link>
                    </div>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black md:flex-row">
                    <div className={"order-first flex-none md:w-1/6 "}>
                        <div className={"flex flex-col gap-y-2 p-6"}>
                            <Navigation navLinks={navItems}/>
                        </div>
                    </div>

                <div className={"order-last min-h-screen w-full md:order-none ml-16 p-6"}>
                    {children}
                </div>
                </div>
            </div>
        </div>
    );

}
