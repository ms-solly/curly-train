import React, { useState, useEffect } from 'react';
import styles from './ChatBox.module.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  image: string;
}

const demoMessages: ChatMessage[] = [
  {
    id: 1,
    user: 'Alice',
    message: 'Hello everyone!',
    timestamp: '10:01 AM',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    user: 'Bob',
    message: 'Hi Alice! How are you?',
    timestamp: '10:02 AM',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 3,
    user: 'Charlie',
    message: 'Good morning! What’s up?',
    timestamp: '10:03 AM',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 4,
    user: 'Diana',
    message: 'Hey! I’m just working on a project.',
    timestamp: '10:04 AM',
    image: 'https://via.placeholder.com/40',
  },
  {
    id: 5,
    user: 'Eve',
    message: 'Sounds interesting! What project?',
    timestamp: '10:05 AM',
    image: 'https://via.placeholder.com/40',
  },
];

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Set demo messages if no saved messages
        setMessages(demoMessages);
        localStorage.setItem('chatMessages', JSON.stringify(demoMessages));
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newChatMessage: ChatMessage = {
      id: Date.now(),
      user: 'User',
      message: newMessage,
      timestamp,
      image: 'https://via.placeholder.com/40',
    };

    const updatedMessages = [...messages, newChatMessage];
    setMessages(updatedMessages);
    setNewMessage('');
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Live Chats Forum</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className={styles.chatBox}>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.chatMessages}>
                {messages.map((msg) => (
                  <div key={msg.id} className={styles.message}>
                    <div className="w-full flex items-center space-x-2 bg-gray-500/20 rounded p-2">
                      <Image
                        src="https://via.placeholder.com/40"
                        alt={msg.user}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="w-full">
                        <strong className='text-lg'>{msg.user}: </strong>
                        <div className='inline-block text-gray-100/80 text-xs'>{msg.message}</div>
                        <div className="text-xs text-right text-gray-500 w-full">
                          <span className='text-xs'>{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.chatInput}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="p-2 border rounded w-full"
              />
              <button
                onClick={handleSendMessage}
                className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ChatBox;
