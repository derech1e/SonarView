"use client";

import {ThemeProvider} from "next-themes";

export function ThemeManger({children}) {
    return (
        <ThemeProvider enableSystem={true} attribute={"class"}>
            {children}
        </ThemeProvider>
    )
}