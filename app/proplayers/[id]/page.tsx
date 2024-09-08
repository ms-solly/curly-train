"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Player } from '@/types/player';
import { Match } from '@/types/match';
import { MatchData } from '@/types/match'; 

const PlayerProfilePage = async ({ params }: { params: { id: string } }) => {
  const accountId = params.id;

  // Fetch player data
  const fetchPlayerData = async (): Promise<Player | null> => {
    try {
      const res = await fetch(`https://api.opendota.com/api/players/${accountId}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      
      return {
        ...data,
        avatar: data.profile.avatarfull,  // Assign correct field for avatar
        name: data.profile.name || 'Unknown',
        team_name: data.team_name || 'No team',
        loccountrycode: data.profile.loccountrycode || 'Unknown',
        last_login: data.profile.last_login ? new Date(data.profile.last_login).toLocaleDateString() : 'Never',
        rank_tier: data.rank_tier || null,
        leaderboard_rank: data.leaderboard_rank || null,
        mmr_estimate: data.mmr_estimate || { estimate: 0 },
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
    <div className="p-6 max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
      <div className="flex items-start space-x-6 mb-6">
        <Image
          src={playerData.avatar}
          alt={playerData.name || playerData.profile.personaname}
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{playerData.profile.personaname}</h1>
            <p className="text-lg text-gray-700">Name: {playerData.name}</p>
            <p className="text-lg text-gray-700">Team: {playerData.team_name}</p>
            <p className="text-lg text-gray-700">Country: {playerData.loccountrycode}</p>
            <p className="text-lg text-gray-700">Last Login: {playerData.last_login}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg text-gray-700">Rank Tier: {playerData.rank_tier || 'Unranked'}</p>
            <p className="text-lg text-gray-700">MMR Estimate: {playerData.mmr_estimate.estimate}</p>
            <p className="text-lg text-gray-700">Matches Played: {playerData.matches_played}</p>
            <p className="text-lg text-gray-700">Leaderboard Rank: {playerData.leaderboard_rank || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Matches</h2>
        <div className="max-h-80 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {recentMatches.slice(0, 10).map((match) => (
              <li key={match.match_id} className="py-2 flex justify-between items-center">
                <Link href={`/matches/${match.match_id}`} className="text-blue-600 hover:underline">
                  Match ID: {match.match_id}
                </Link>
                <p className="text-gray-600">Hero ID: {match.hero_id}</p>
                <p className="text-gray-600">Duration: {match.duration} seconds</p>
              </li>
            ))}
          </ul>
          {recentMatches.length > 10 && (
            <div className="mt-4">
              <Link href={`/players/${accountId}/matches`} className="text-blue-600 hover:underline">
                View More Matches
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;
