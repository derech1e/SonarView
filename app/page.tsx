import Link from "next/link";

export default function Home() {


    return (
        <div className={"flex flex-col justify-between h-screen"}>
            <div className={"flex flex-col h-full justify-between"}>
                <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
                    <div
                        className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true">
                        <div
                            className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-400 to-primary-muted opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                            }}/>
                    </div>
                    <div
                        className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true">
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-red-300 to-orange-800 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}/>
                    </div>
                </div>
                <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-white via-white/60 via-70%">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
                         aria-label="Global">
                        <div className="flex lg:flex-1">
                            <a className="flex flex-row items-baseline" href="/">
                                <h1 className="flex flex-row items-baseline text-2xl font-bold relative">
                                    <span className="sr-only">sonarview</span>
                                    <span className="tracking-tight hover:cursor-pointer">sonar<span
                                        className="text-red-600">view</span></span>
                                    <sup
                                        className="absolute top-0 left-[calc(100%+.1rem)] text-xs font-bold text-black">[BETA]</sup>
                                </h1>
                            </a></div>
                        <div className="hidden lg:flex lg:gap-x-12"></div>
                        <div className="flex flex-1 items-center justify-end gap-x-6">
                            <div className="flex gap-4 items-center">
                                <Link
                                    className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    href="/dashboard">Sign In </Link>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="-mt-16">
                    <div className="flex items-center justify-center overflow-auto">
                        <div className="relative isolate px-6 py-14 lg:px-8">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Homecontrol
                                    made easy!</h1>
                                <p
                                    className="mt-6 text-lg leading-8 text-gray-600">A simple way to control and
                                    overview your home cistern.</p>
                                <div className="mt-10 flex items-center justify-center gap-x-6"><a
                                    className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    href="/dashboard">Get started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="bottom-0 w-full bg-gray-900">
                    <h2 className="sr-only">Footer</h2>
                    <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
                        <div className="border-white/10 pt-8 md:flex md:items-center md:justify-between">
                            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">© 2023
                                Nuerk-Solutions.
                                All rights
                                reserved.</p></div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
