"use client";
import React, {createContext, useContext, useEffect, useState} from 'react';

export interface SettingsInterface {
    radius: number;
    heightAboveGround: number;
    maxWaterHeight: number;
    minWaterHeight: number;
}

interface SettingsContextType {
    settings: SettingsInterface;
    setSettings: React.Dispatch<React.SetStateAction<SettingsInterface>>;
}

export const defaultSettings: SettingsInterface = {
    radius: 100,
    heightAboveGround: 236,
    maxWaterHeight: 63.13,
    minWaterHeight: 3,
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {
    },
});

export const SettingsContextProvider = ({children}) => {
    const [settings, setSettings] = useState(() => {
        const storedSettings = localStorage.getItem('settings');
        return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    });

    const updateSettings: SettingsContextType['setSettings'] = (newSettings) => {
        setSettings(newSettings);
    };

    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    return (
        <SettingsContext.Provider value={{settings, setSettings: updateSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettingsContext = () => useContext(SettingsContext);
