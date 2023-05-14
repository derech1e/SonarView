"use client";
import {useTheme} from "next-themes";
import {MoonIcon, SunIcon} from "@heroicons/react/20/solid";

export function ThemeToggler() {
    const {systemTheme, theme, setTheme} = useTheme();

    const renderThemeChanger = () => {
        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <SunIcon className="w-5 h-5 text-yellow-500" role="button" onClick={() => setTheme('light')}/>
            )
        } else {
            return (
                <MoonIcon className="w-5 h-5 text-gray-900" role="button" onClick={() => setTheme('dark')}/>
            )
        }
    };

    return (
        <button>
            <div
                className="text-gray-600 hover:bg-gray-200 hover:text-black rounded-md px-3 py-1.5">
                {renderThemeChanger()}
            </div>
        </button>
    );
}