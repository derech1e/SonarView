'use client';

import {useSelectedLayoutSegment} from 'next/navigation';
import Link from "next/link";

export function Navigation({navLinks}) {
    const pathname = useSelectedLayoutSegment();


    return (
        <>
            {navLinks.map((link) => {
                const isActive = (pathname == null ? ' ' : pathname) === link.href;

                return (
                    <Link
                        className={isActive ?
                            'flex flex-row items-center gap-2 px-4 py-1.5 text-sm font-medium focus:outline-red-500 rounded-md bg-gray-300 dark:bg-dark-accent text-black dark:text-white'
                            : 'flex flex-row items-center gap-2 px-4 py-1.5 text-sm font-medium focus:outline-red-500 text-gray-500 hover:rounded-md dark:hover:bg-dark-accent hover:bg-gray-300 hover:transition-colors hover:duration-300 hover:ease-in-out'}
                        href={`/dashboard/${link.href}`}
                        key={link.name}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </>
    );
}