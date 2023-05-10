"use client";

import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {useEffect, useState} from "react";
import {timerSocket} from "@/app/socket";

const children = ({remainingTime}) => {
    const remainingDate = new Date(remainingTime * 1000);

    return `${remainingDate.toISOString().substring(14, 19)}`
}

export default function Timer() {

    const initialRemainingTime = 60 * 5;
    const [isPlaying, setIsPlaying] = useState(false)
    const [count, setCount] = useState(initialRemainingTime);


    const [isConnected, setIsConnected] = useState(timerSocket.connected);

    useEffect(() => {
        function onConnect() {
            console.log("CONNECTED")
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onTimerEvent(newData) {
            console.log(newData)
            if (newData === 'Timer stopped.') {
                setIsPlaying(false)
                setCount(initialRemainingTime);
                return
            }
            if (!isPlaying) {
                setCount(newData);
                setIsPlaying(true)
            }
        }

        timerSocket.on('connect', onConnect);
        timerSocket.on('disconnect', onDisconnect);
        timerSocket.on('timer', onTimerEvent);


        return () => {
            timerSocket.off('connect', onConnect);
            timerSocket.off('disconnect', onDisconnect);
            timerSocket.off('timer', onTimerEvent);
        };
    });

    return (
        <div>
            <svg className={"absolute"}>
                <defs>
                    <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="5%" stopColor="gold"/>
                        <stop offset="95%" stopColor="red"/>
                    </linearGradient>
                </defs>
            </svg>
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={count}
                // initialRemainingTime={initialRemainingTime}
                isSmoothColorTransition={false}
                colors="url(#your-unique-id)"
                onComplete={() => {
                    setIsPlaying(false)
                    return {shouldRepeat: false, newInitialRemainingTime: initialRemainingTime};
                }}
            >
                {({remainingTime}) => children({remainingTime})}
            </CountdownCircleTimer>
            <hr/>
            <button onClick={() => {
                console.log("Connecting")
                timerSocket.connect();
                setIsConnected(true)
                // setIsPlaying((prev) => !prev)}>
            }}>
                Toggle Playing
            </button>
            <button onClick={() => setCount((prev) => (prev += 5))}>Count</button>
        </div>
    );
}