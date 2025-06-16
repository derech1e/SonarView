import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'sonarview',
    description: 'Sonarview - Homecontrol made easy!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" suppressHydrationWarning>
        <body className="bg-white text-black dark:bg-dark dark:text-white font-sans">
        {children}
        </body>
        </html>
    )
}