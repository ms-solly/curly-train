"use client";

import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { Player } from '@/types/player';
import axios from 'axios';
import Image from 'next/image';

const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const accountIds = [
    19672354, 105248644, 113331514, 70388657, 
    86745912, 94054712, 311360822, 94049589,
  ];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const fetchedPlayers: Player[] = [];
        
        for (const id of accountIds) {
          const response = await axios.get<Player>(`https://api.opendota.com/api/players/${id}`);
          const playerData = response.data;
          
          // Ensure necessary fields are populated before adding
          if (playerData.profile && playerData.profile.account_id) {
            fetchedPlayers.push(playerData);
          }
        }
  
        setPlayers(fetchedPlayers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setLoading(false);
      }
    };
  
    fetchPlayers();
  }, []);
  
  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Please enter an account ID.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get<Player>(`https://api.opendota.com/api/players/${searchTerm}`);
      const playerData = response.data;
      
      if (playerData.profile) {
        setPlayers([playerData]); // Display only the searched player
      } else {
        setError('Player not found. Please check the account ID.');
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching player:', error);
      setError('Error fetching player data. Please try again.');
      setLoading(false);
    }
  };
  

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/_next/static/media/bg.720ca035.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 font-rubik">Players</h1>
        <input
          type="text"
          placeholder="Search players by ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 bg-white/5 bg-opacity-20 border-2  rounded-lg text-white outline-none font-rubik"
        />
        <button
          onClick={handleSearch}
          className="mb-6 px-4 py-2 bg-sky-600 text-white rounded-lg font-rubik"
        >
          Search
        </button>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map(player => (
              <div key={player.profile.account_id} className="flex flex-col items-center bg-white/5 bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <Image
                  src={player.profile?.avatarfull}
                  alt={player.profile?.personaname}
                  className="rounded-full w-24 h-24 mb-4"
                  width={96}
                  height={96}
                />
                <h2 className="text-xl font-bold font-rubik text-sky-600">{player.profile?.personaname}</h2>
                <p className="text-sm font-rubik">Rank: {player.competitive_rank || 'N/A'}</p>
                <p className="text-sm font-rubik">MMR Estimate: {player.mmr_estimate?.estimate || 'N/A'}</p>
                <a
                  href={player.profile?.profileurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-3 py-2 bg-white bg-opacity-20 rounded-md text-white font-rubik transition-transform transform hover:scale-105 hover:bg-sky-600 hover:text-white"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
