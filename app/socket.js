import {io} from "socket.io-client";

export const socket = io('http://192.168.200.193:3000/sonar', {autoConnect: false});