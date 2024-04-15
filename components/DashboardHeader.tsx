"use client";
import Link from "next/link";
import {useSelectedLayoutSegments} from "next/navigation";

export const navItems = [
    {
        name: 'Dashboard',
        href: ' ',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="1.13em" height="1em" viewBox="0 0 576 512">
            <path fill="currentColor"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1c-1.4.1-2.8.1-4.2.1H392c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2c-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24"/>
        </svg>
    },
    {
        name: 'Sonar',
        href: 'sonar',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="1.13em" height="1em" viewBox="0 0 576 512">
            <path fill="currentColor"
                  d="M288 352c17.7 0 32-14.3 32-32V109.3l25.4 25.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-80-80c-12.5-12.5-32.8-12.5-45.3 0l-80 80c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l25.3-25.4V320c0 17.7 14.3 32 32 32m-18.5 69.9C247 437.4 219.5 448 192 448c-26.9 0-55.3-10.8-77.4-26.1c-11.9-8.5-28.1-7.8-39.2 1.7c-14.4 11.9-32.5 21-50.6 25.2c-17.2 4-27.9 21.2-23.9 38.4s21.2 27.9 38.4 23.9c24.5-5.7 44.9-16.5 58.2-25c29 15.6 61.5 25.9 94.5 25.9c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.5 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.4-27.3-10.1-39.2-1.7c-22 15.2-50.5 26-77.4 26c-27.5 0-55-10.6-77.5-26.1c-11.1-7.9-25.9-7.9-37 0M192 192H48c-26.5 0-48 21.5-48 48v185c5.3-3.1 11.2-5.4 17.5-6.9c13.1-3.1 26.7-9.8 37.3-18.6c22.2-18.7 54.3-20.1 78.1-3.4c18 12.4 40.1 20.3 59.1 20.3zm384 48c0-26.5-21.5-48-48-48H384v224.5c19 0 41.2-7.9 59.2-20.3c23.8-16.7 55.8-15.3 78.1 3.4c10.6 8.8 24.2 15.6 37.3 18.6c6.3 1.5 12.1 3.8 17.5 6.9V240z"/>
        </svg>
    },
    {
        name: 'Cron Jobs',
        href: 'cron',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
            <path fill="currentColor"
                  d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32M0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16"/>
        </svg>
    },
    {
        name: 'Timer',
        href: 'timer',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
            <path fill="currentColor"
                  d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16v34.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32S289.7 0 272 0h-48zm72 192v128c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24"/>
        </svg>
    },
    {
        name: 'Logs',
        href: 'logs',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
            <defs>
                <mask id="ipSLog0">
                    <g fill="none" strokeLinejoin="round" strokeWidth="4">
                        <path fill="#fff" stroke="#fff" d="M13 10h28v34H13z"/>
                        <path stroke="#fff" strokeLinecap="round" d="M35 10V4H8a1 1 0 0 0-1 1v33h6"/>
                        <path stroke="#000" strokeLinecap="round" d="M21 22h12m-12 8h12"/>
                    </g>
                </mask>
            </defs>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSLog0)"/>
        </svg>
    },
    {
        name: 'Settings',
        href: 'settings',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
            <path fill="currentColor"
                  d="M495.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4l-55.6 17.8c-8.8 2.8-18.6.3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4c-1.1-8.4-1.7-16.9-1.7-25.5s.6-17.1 1.7-25.4l-43.3-39.4c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160a80 80 0 1 0 0 160"/>
        </svg>
    },
];


export function DashboardHeader() {

    const segments = useSelectedLayoutSegments();

    return (
        <div className={"mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"}>
            <div className={"flex items-center gap-x-4 overflow-header min-w-1/4"}>
                <Link href={"/"} className={"flex flex-row items-baseline focus:outline-red-500"}>
                    <h1 className="flex flex-row items-baseline text-2xl font-bold relative"><span
                        className="sr-only">SonarView</span><span
                        className="tracking-tight hover:cursor-pointer">sonar<span
                        className="text-red-600">view</span></span><sup
                        className="absolute top-0 left-[calc(100%+.1rem)] text-xs font-bold text-black hidden">[BETA]</sup>
                    </h1>
                </Link>
                <span className="text-gray-400 text-5xl font-thin ">/</span>
                {
                    segments.map((segment, index) => {
                        return (
                            <div key={index} className={"flex items-center gap-x-4"}>
                                {index !== 0 && <span className="text-gray-400 text-5xl font-thin">/</span>}
                                <span
                                    className={`pt-2 `}>{navItems.find(item => item.href == segment)?.name || segment}</span>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex items-center gap-6">
                <Link href="/dashboard">
                    <div
                        className="flex items-center group gap-2 text-gray-600 hover:bg-gray-200 hover:text-black rounded-md px-3 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                            <path fill="currentColor" fillRule="evenodd"
                                  d="M18 10a8 8 0 1 1-16 0a8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061a3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <span className="text-sm">Help</span></div>
                </Link>
            </div>
        </div>
    );

}