// components/ChatBox.tsx
import React, { useState, useEffect } from 'react';
import styles from './ChatBox.module.css';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    // Load saved messages from localStorage (or your backend) when component mounts
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSendMessage = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newChatMessage = {
      id: Date.now(),
      user: 'User', 
      message: newMessage,
      timestamp,
    };

    const updatedMessages = [...messages, newChatMessage];
    setMessages(updatedMessages);
    setNewMessage('');

    // Save messages to localStorage (or your backend)
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.chatMessages}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <span className={styles.timestamp}>{msg.timestamp}</span>
            <strong>{msg.user}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
