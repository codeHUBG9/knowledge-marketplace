import React from 'react';

const ChatMessage = ({ message, sender }) => {
    return (
        <div className={`chat-message ${sender === 'me' ? 'my-message' : 'other-message'}`}>
            <span className="sender">{sender}</span>
            <p className="message-content">{message}</p>
        </div>
    );
};

export default ChatMessage;