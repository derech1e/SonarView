"use client";
import React, {createContext, useContext, useEffect, useState} from 'react';

const STONE_HEIGHT = 6.5;
const HOSE_DIAMETER = 3;
export const AVERAGE_WATER_USAGE_PER_MINUTE = 0.79190125;
export const AVERAGE_WATER_FILL_PER_MINUTE = 0.3000564;

export interface SettingsInterface {
    radius: number;
    heightAboveGround: number;
    maxWaterHeight: number;
    minWaterHeight: number;
    range: number;
}

interface SettingsContextType {
    settings: SettingsInterface;
    setSettings: React.Dispatch<React.SetStateAction<SettingsInterface>>;
}

export const defaultSettings: SettingsInterface = {
    radius: 100,
    heightAboveGround: 243.67,
    maxWaterHeight: 63.13,
    minWaterHeight: 2 + HOSE_DIAMETER + STONE_HEIGHT,
    range: 48,
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {
    },
});

export const SettingsContextProvider = ({children}) => {
    const [settings, setSettings] = useState(defaultSettings);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const updateSettings: SettingsContextType['setSettings'] = (newSettings) => {
        if(timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(setTimeout(() => setSettings(newSettings), 1500));
        // const timeOutId = setTimeout(() => setSettings(newSettings), 500);
        // return () => clearTimeout(timeOutId);
    };

    return (
        <SettingsContext.Provider value={{settings, setSettings: updateSettings}}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettingsContext = () => useContext(SettingsContext);
