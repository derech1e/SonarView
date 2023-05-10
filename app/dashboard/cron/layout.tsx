import CronJobHeader from "@/components/CronJobHeader";

export default function CronLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
        <div>
            <CronJobHeader />
            {children}
        </div>
    );
}