"use client";

import {ThemeProvider} from "next-themes";

export function ThemeManger({children}) {
    return (
        <ThemeProvider enableSystem={false} attribute={"class"}>
            {children}
        </ThemeProvider>
    )
}