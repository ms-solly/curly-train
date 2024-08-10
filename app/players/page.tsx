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


  const accountIds = [
    19672354, 105248644, 113331514, 87278757, 70388657, 
    86745912, 94054712, 311360822, 131380551, 94049589,

  ];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const fetchedPlayers = [];
        
        for (const id of accountIds) {
          const response = await axios.get<Player>(`https://api.opendota.com/api/players/${id}`);
          fetchedPlayers.push(response.data);
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

  const filteredPlayers = players.filter(player =>
    player.profile?.personaname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="relative min-h-screen text-white">
        <div className="relative z-10 container mx-auto p-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 font-rubik">Players</h1>
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 p-2 rounded-lg text-black outline-none"
          />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlayers.map(player => (
                <div key={player.profile.account_id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg">
                  <Image
                    src={player.profile?.avatarfull}
                    alt={player.profile?.personaname}
                    className="rounded-full w-24 h-24 mb-4"
                    width={96}
                    height={96}
                  />
                  <h2 className="text-xl font-bold">{player.profile?.personaname}</h2>
                  <p className="text-sm">Rank: {player.competitive_rank || 'N/A'}</p>
                  <p className="text-sm">MMR Estimate: {player.mmr_estimate?.estimate || 'N/A'}</p>
                  <a
                    href={player.profile?.profileurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-500 underline"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayersPage;
