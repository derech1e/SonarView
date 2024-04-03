import {io} from "socket.io-client";

export const sonarSocket = io(`http://pi.de:3000/sonar`, {autoConnect: false, forceNew: true, upgrade: false});
export const timerSocket = io(`http://pi.de:3000/timer`, {autoConnect: false, forceNew: true, upgrade: false});