"use client";
import React, {useState} from 'react';

interface SettingsInterface {
    diameter: number;
    heightAboveGround: number;
    maxWaterHeight: number;
    minWaterHeight: number;
}

const SiteContext = React.createContext<{
    diameter: number;
    heightAboveGround: number;
    maxWaterHeight: number;
    minWaterHeight: number;
}>({
    diameter: 1,
    heightAboveGround: 0,
    maxWaterHeight: 0,
    minWaterHeight: 1,
});

export function SiteContextProvider ({ children })  {
    const [settings, setSettings] = useState<SettingsInterface>({diameter: 1, heightAboveGround: 0, maxWaterHeight: 0, minWaterHeight: 1});

    return (
        <SiteContext.Provider value={{ diameter: settings.diameter, heightAboveGround: settings.heightAboveGround, maxWaterHeight: settings.maxWaterHeight, minWaterHeight: settings.minWaterHeight }}>
            {children}
        </SiteContext.Provider>
    );
};

export default SiteContext;
