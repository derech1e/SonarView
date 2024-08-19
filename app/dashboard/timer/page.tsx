"use client";

import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {useEffect, useState} from "react";
import {timerSocket} from "@/app/socket";
import {DurationRadioGroup, durations} from "@/app/dashboard/timer/(components)/DurationRadioGroup";
import {Transition} from "@headlessui/react";
import {LoadingSpinner} from "@/components/LoadingSpinner";

const children = ({remainingTime}) => {
    const remainingDate = new Date((remainingTime || 0) * 1000);

    return `${remainingDate?.toISOString().substring(14, 19)}`
}

const outlinedClassName = "border-2 border-red-600 shadow-sm text-red-800 dark:text-red-400 bg-transparent hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:text-white dark:hover:text-white"
const filledClassName = "text-white bg-red-600 hover:bg-red-700 focus:outline-red-500"

export default function Timer() {

    const [initialRemainingTime, setInitialRemainingTime] = useState<number | undefined>(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [duration, setDuration] = useState(initialRemainingTime || 0);
    const [selectedDuration, setSelectedDuration] = useState(durations[1])

    const [isConnected, setIsConnected] = useState(timerSocket.connected);

    function connectToSocket() {
        if (!timerSocket.connected)
            timerSocket.connect()
    }

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
            setIsLoading(false)
        }

        function onTimerEvent(...args) {
            if (args[0] === 'Timer stopped.' || args[0] === 'Timer done.') {
                setInitialRemainingTime(0);
                setIsPlaying(false);
                setIsLoading(false)
                return
            }
            if (!isPlaying) {
                setIsPlaying(true)
                setDuration(args[1]);
                setInitialRemainingTime(args[0]);
                setIsLoading(false)
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

    useEffect(() => {
        if (!isConnected && !isPlaying) {
            connectToSocket()
        }
    }, []);

    function handleTimerStart() {
        setIsLoading(true);
        connectToSocket()
        timerSocket.emit('startTimer', {duration: selectedDuration.seconds});
    }

    function handleTimerStop() {
        setIsLoading(true)
        connectToSocket()
        timerSocket.emit('stopTimer');
    }

    return (
        <div className={"flex flex-col w-full"}>
            <div className="flex flex-col text-start w-full gap-2">
                <h1 className="font-medium text-xl dark:text-white">Overview</h1>
                <p className="text-sm text-gray-600 dark:text-dark-text">View and manage the Cistern!{isConnected}</p>
            </div>

            <div className="flex flex-col w-full gap-2 p-4 bg-gray-100 rounded-lg mt-6 dark:bg-dark-accent">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col text-start w-full gap-2">
                        <h1 className="font-medium text-xl dark:text-white">Timer Control</h1>
                        <p className="text-sm text-gray-600 dark:text-dark-text">Start and Stop the timer for the
                            cistern</p>
                    </div>
                    <div className={"inline-flex items-center gap-2"}>
                        {isLoading &&
                            <LoadingSpinner size={32}/>}
                        <button
                            disabled={isPlaying}
                            className={`px-8 py-4 text-sm font-medium rounded-md disabled:opacity-60 disabled:cursor-not-allowed ${!isPlaying ? outlinedClassName : filledClassName}`}
                            onClick={handleTimerStart}>
                            Start
                        </button>
                        <button
                            disabled={!isPlaying}
                            className={`px-8 py-4 text-sm font-medium rounded-md disabled:opacity-60 disabled:cursor-not-allowed ${isPlaying ? outlinedClassName : filledClassName}`}
                            onClick={handleTimerStop}>
                            Stop
                        </button>
                    </div>
                </div>
            </div>
            {isPlaying ? (
                <div className="flex flex-col text-start w-full gap-2 mt-6 mb-4">
                    <h1 className="font-medium text-xl dark:text-white">Duration</h1>
                    <p className="text-sm text-gray-600 dark:text-dark-text">The current left time until the timer
                        stops</p>
                </div>
            ) : (
                <div className="flex flex-col text-start w-full gap-2 mt-6">
                    <h1 className="font-medium text-xl dark:text-white">Duration</h1>
                    <p className="text-sm text-gray-600 dark:text-dark-text">Pick a duration for the timer that is used
                        when pressing the
                        start
                        button</p>
                </div>
            )}
            <div className={"relative"}>
                <Transition as="div"
                            show={isPlaying}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                    <CountdownCircleTimer
                        initialRemainingTime={initialRemainingTime}
                        duration={duration}
                        isPlaying={isPlaying}
                        colors={['#DC2626', '#dc5a26', '#3edc26']}
                        colorsTime={[duration - (duration / 2), duration - (duration / 3), 0]}
                        size={300}
                    >
                        {({remainingTime}) => <span
                            className={"text-3xl font-medium"}>{children({remainingTime})}</span>}
                    </CountdownCircleTimer>
                </Transition>
                <Transition as="div"
                            show={!isPlaying}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                    <DurationRadioGroup selectedDuration={selectedDuration}
                                        setSelectedDuration={setSelectedDuration}/>
                </Transition>
            </div>
        </div>
    );
}