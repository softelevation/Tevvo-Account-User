import React from 'react';
import {io} from 'socket.io-client';
import {API_URL} from './config';

export const socket = io(API_URL.BASE_URL);
export const SocketContext = React.createContext();
