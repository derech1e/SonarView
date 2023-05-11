import {io} from "socket.io-client";

export const sonarSocket = io('http://192.168.200.193:3000/sonar', {autoConnect: false});
export const timerSocket = io('http://192.168.200.184:3000/timer', {autoConnect: true, forceNew: true, upgrade: false});