import {socket} from "@/app/socket";
import {useEffect, useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export function ConnectionManager({isConnected}) {
    const [button, setButton] = useState('disconnect');

    useEffect(() => {
        setButton(isConnected ? 'connect' : 'disconnect');
    }, [isConnected]);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if(newAlignment === 'connect') {
            connect();
        } else {
            disconnect();
        }
        setButton(newAlignment);
    };
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={button}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="connect">Connect</ToggleButton>
                <ToggleButton value="disconnect">Disconnect</ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}