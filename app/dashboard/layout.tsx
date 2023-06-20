import {Navigation} from "@/components/NavigationLinks";
import {DashboardHeader, navItems} from "@/components/DashboardHeader";
import {SettingsContextProvider} from "@/components/Context";


export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {

    return (
        <SettingsContextProvider>
            <div className={"h-full w-full dark:bg-dark"}>
                <DashboardHeader/>
                <div className="h-px bg-gray-200"></div>
                <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black md:flex-row dark:bg-dark">
                    <div className={"order-first flex-none md:w-1/6 "}>
                        <div className={"flex flex-col gap-y-2 p-6 "}>
                            <Navigation navLinks={navItems}/>
                        </div>
                    </div>

                    <div className={"order-last min-h-screen w-full md:order-none lg:ml-16 p-6 dark:bg-dark"}>
                        {children}
                    </div>
                </div>
            </div>
        </SettingsContextProvider>
    );

}
