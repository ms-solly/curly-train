import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

interface ChatMessage {
  time: number;
  unit: string;
  key: string;
  slot: number;
  player_slot: number;
}

interface PlayerProfile {
  player_slot: number;
  personaname: string;
  avatar: string;
}

interface ChatProps {
  matchId: number;
}

const Chat: React.FC<ChatProps> = ({ matchId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hoveredProfile, setHoveredProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://api.opendota.com/api/matches/${matchId}`);
        const data = await response.json();
        if (data.chat) {
          setMessages(data.chat.slice(-10)); // Get the latest 10 messages
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchMessages();

    // Polling for live updates every 30 seconds
    const intervalId = setInterval(fetchMessages, 30000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [matchId]);

  const formatTime = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className=" text-white rounded-lg ">
      <h1 className="w-full text-xl capitalize p-4 bg-gray-900 rounded-lg border-2 m-2 border-gray-300">Live Chats</h1>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className=" bg-gray-900 flex m-4 items-start py-2 px-2 border-b border-gray-800 relative rounded border-2 "
            onMouseEnter={() => setHoveredProfile({
              player_slot: msg.player_slot,
              personaname: `Player ${msg.player_slot}`, // Placeholder, replace with actual data
              avatar: `https://api.opendota.com/players/${msg.player_slot}/avatar`, // Placeholder, replace with actual data
            })}
            onMouseLeave={() => setHoveredProfile(null)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
              <img src={`https://api.opendota.com/players/${msg.player_slot}/avatar`} alt="" className="w-full h-full rounded-full" /> {/* Placeholder */}
            </div>
            <div>
              <div className="font-bold text-sm cursor-pointer">
                {msg.unit}
              </div>
              <div>{msg.key}</div>
              <div className="text-xs text-gray-400">{formatTime(msg.time)}</div>
            </div>
            {hoveredProfile && hoveredProfile.player_slot === msg.player_slot && (
              <div className="absolute bg-gray-800 text-white p-2 rounded-lg shadow-lg top-0 left-12">
                <img src={hoveredProfile.avatar} alt="" className="w-10 h-10 rounded-full" />
                <p>{hoveredProfile.personaname}</p>
                <p>Slot: {hoveredProfile.player_slot}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No chat messages available.</div>
      )}
    </div>
  );
};

export default Chat;
