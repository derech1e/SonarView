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
                        className={isActive ? 'flex flex-row items-center gap-2 px-4 py-1.5 text-sm font-medium focus:outline-red-500 rounded-md bg-gray-300 text-black' : 'flex flex-row items-center gap-2 px-4 py-1.5 text-sm font-medium focus:outline-red-500 text-gray-500'}
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