import React, { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const ChatRoom = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        socket.emit('joinRoom', roomId);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('typing', (user) => {
            setTypingUsers((prevUsers) => [...prevUsers, user]);
        });

        socket.on('stopTyping', (user) => {
            setTypingUsers((prevUsers) => prevUsers.filter((u) => u !== user));
        });

        return () => {
            socket.emit('leaveRoom', roomId);
            socket.off('message');
            socket.off('typing');
            socket.off('stopTyping');
        };
    }, [roomId, socket]);

    const handleSendMessage = (messageContent) => {
        const message = { content: messageContent, roomId };
        socket.emit('sendMessage', message);
    };

    return (
        <div className="chat-room">
            <div className="messages">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
            </div>
            {/* Add input for sending messages here */}
        </div>
    );
};

export default ChatRoom;