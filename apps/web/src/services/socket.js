import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSocketStore } from '../store/socketStore';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:4000';

const useSocket = () => {
    const { socket, setSocket } = useSocketStore();

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [setSocket]);

    return socket;
};

export default useSocket;