import {SignIn} from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
    return (
        <div className={"w-screen h-screen"}>
            <div className={"flex items-center justify-center w-full h-full"}>
                <div className={"flex flex-col justify-center"}>
                    <SignIn signUpUrl={undefined}  appearance={{
                        variables: {
                            colorPrimary: '#DC2626',
                        },
                        elements: {
                            footerAction__signIn: {
                                visibility: 'hidden',
                                display: 'none',
                            },
                            footerAction__havingTrouble: {
                                visibility: 'hidden',
                                display: 'none',
                            },
                        },
                        layout: {
                            showOptionalFields: false,
                            privacyPageUrl: '/info/privacy-policy',
                            termsPageUrl: '/info/terms-of-service',
                        },
                    }}/>
                    {/*<div className={"flex pt-4"}>*/}
                    {/*    <span>By signin in, you agree to our <Link href={"/info/terms-of-service"} className={"text-blue-500 underline"}>Terms of Service</Link></span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}