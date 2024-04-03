import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'sonarview',
    description: 'Sonarview - Homecontrol made easy!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (
            <html lang="de">
            <body className={inter.className + "h-screen w-screen bg-background font-sans text-foreground"}>
                    {children}
            </body>
            </html>
    )
}