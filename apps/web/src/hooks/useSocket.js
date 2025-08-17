import { useEffect, useRef } from 'react';
import { useStore } from '../store/socketStore';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

const useSocket = () => {
    const socketRef = useRef();
    const { setSocket } = useStore();

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);
        setSocket(socketRef.current);

        return () => {
            socketRef.current.disconnect();
        };
    }, [setSocket]);

    return socketRef.current;
};

export default useSocket;