import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

// Define TypeScript interfaces for data
interface PlayerData {
  profile: {
    avatarfull: string;
    personaname: string;
    name: string;
  };
  competitive_rank: number;
}

interface MatchData {
  match_id: number;
  hero_id: number;
  duration: number;
}

interface PageProps {
  playerData: PlayerData | null;
  recentMatches: MatchData[];
}

// API call functions
const fetchPlayerData = async (accountId: string): Promise<PlayerData | null> => {
  try {
    const res = await fetch(`https://api.opendota.com/players/${accountId}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching player data:', error);
    return null;
  }
};

const fetchRecentMatches = async (accountId: string): Promise<MatchData[]> => {
  try {
    const res = await fetch(`https://api.opendota.com/players/${accountId}/recentMatches`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    return [];
  }
};

// Page component
const Page: React.FC<PageProps> = ({ playerData, recentMatches }) => {
  const [showRecentMatches, setShowRecentMatches] = useState(false);

  if (!playerData) {
    return <div>Error loading player data</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Image
          src={playerData.profile.avatarfull}
          alt={playerData.profile.personaname}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{playerData.profile.personaname}</h1>
          <p className="text-gray-600">{playerData.profile.name}</p>
          <p className="text-gray-500">Rank: {playerData.competitive_rank}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Matches</h2>
        <button
          onClick={() => setShowRecentMatches(!showRecentMatches)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showRecentMatches ? 'Hide Recent Matches' : 'Show Recent Matches'}
        </button>
        {showRecentMatches && (
          <ul className="mt-4">
            {recentMatches.length > 0 ? (
              recentMatches.map((match) => (
                <li key={match.match_id} className="border-b py-2">
                  <p className="font-semibold">Match ID: {match.match_id}</p>
                  <p>Hero ID: {match.hero_id}</p>
                  <p>Duration: {match.duration} seconds</p>
                </li>
              ))
            ) : (
              <p>No recent matches found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

// Server-side props function
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const accountId = context.params?.id as string;

  const playerData = await fetchPlayerData(accountId);
  const recentMatches = await fetchRecentMatches(accountId);

  return {
    props: {
      playerData: playerData || null,
      recentMatches: recentMatches || [],
    },
  };
};

export default Page;
