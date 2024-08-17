"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PublicMatchData {
  match_id: number;
  match_seq_num: number;
  radiant_win: boolean | null;
  start_time: number;
  duration: number;
  lobby_type: number;
  game_mode: number;
  avg_rank_tier: number;
  num_rank_tier: number;
  cluster: number;
  radiant_team: number[];
  dire_team: number[];
}

const PublicMatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<PublicMatchData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch matches with query parameters
  const fetchMatches = async (params: any) => {
    try {
      const response = await axios.get('https://api.opendota.com/api/publicMatches', { params });
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError('Error fetching matches data');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set your query parameters here
    const queryParams = {
      less_than_match_id: 3703866531,  // Example value
      min_rank: 10,
      max_rank: 85,
      mmr_ascending: 1,
      mmr_descending: 0,
    };
    fetchMatches(queryParams);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Public Matches</h1>
      {matches.length > 0 ? (
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-200">
              <th className="px-4 py-2 text-left">Match ID</th>
              <th className="px-4 py-2 text-left">Match Seq Num</th>
              <th className="px-4 py-2 text-left">Radiant Win</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Lobby Type</th>
              <th className="px-4 py-2 text-left">Game Mode</th>
              <th className="px-4 py-2 text-left">Avg Rank Tier</th>
              <th className="px-4 py-2 text-left">Num Rank Tier</th>
              <th className="px-4 py-2 text-left">Cluster</th>
              <th className="px-4 py-2 text-left">Radiant Team</th>
              <th className="px-4 py-2 text-left">Dire Team</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.match_id} className="border-b border-gray-200">
                <td className="px-4 py-2">{match.match_id}</td>
                <td className="px-4 py-2">{match.match_seq_num}</td>
                <td className="px-4 py-2">{match.radiant_win === null ? 'Unknown' : match.radiant_win ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">{new Date(match.start_time * 1000).toLocaleString()}</td>
                <td className="px-4 py-2">{match.duration} seconds</td>
                <td className="px-4 py-2">{match.lobby_type}</td>
                <td className="px-4 py-2">{match.game_mode}</td>
                <td className="px-4 py-2">{match.avg_rank_tier}</td>
                <td className="px-4 py-2">{match.num_rank_tier}</td>
                <td className="px-4 py-2">{match.cluster}</td>
                <td className="px-4 py-2">{match.radiant_team.join(', ')}</td>
                <td className="px-4 py-2">{match.dire_team.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No public matches data available.</p>
      )}
    </div>
  );
};

export default PublicMatchesPage;
