import React from 'react';
import Image from 'next/image';

// Define TypeScript interfaces for data
interface PlayerData {
  avatarfull: string;
  personaname: string;
  name: string;
  team_name: string | null;
  loccountrycode: string | null;
  last_login: string;
}

interface MatchData {
  match_id: number;
  hero_id: number;
  duration: number;
}

const PlayerProfilePage = async ({ params }: { params: { id: string } }) => {
  const accountId = params.id;

  // Fetch player data
  const fetchPlayerData = async (): Promise<PlayerData | null> => {
    try {
      const res = await fetch(`https://api.opendota.com/api/players/${accountId}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return {
        avatarfull: data.profile.avatarfull,
        personaname: data.profile.personaname,
        name: data.profile.name || 'Unknown',
        team_name: data.team_name || 'No team',
        loccountrycode: data.loccountrycode || 'Unknown',
        last_login: data.last_login ? new Date(data.last_login).toLocaleDateString() : 'Never',
      };
    } catch (error) {
      console.error('Error fetching player data:', error);
      return null;
    }
  };

  // Fetch recent matches
  const fetchRecentMatches = async (): Promise<MatchData[]> => {
    try {
      const res = await fetch(`https://api.opendota.com/api/players/${accountId}/recentMatches`);
      if (!res.ok) throw new Error('Network response was not ok');
      return await res.json();
    } catch (error) {
      console.error('Error fetching recent matches:', error);
      return [];
    }
  };

  const playerData = await fetchPlayerData();
  const recentMatches = await fetchRecentMatches();

  if (!playerData) {
    return <div>Error loading player data</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Image
          src={playerData.avatarfull}
          alt={playerData.personaname}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{playerData.personaname}</h1>
          <p className="text-gray-600">Name: {playerData.name}</p>
          <p className="text-gray-500">Team: {playerData.team_name}</p>
          <p className="text-gray-500">Country: {playerData.loccountrycode}</p>
          <p className="text-gray-500">Last Login: {playerData.last_login}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Matches</h2>
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
      </div>
    </div>
  );
};

export default PlayerProfilePage;
