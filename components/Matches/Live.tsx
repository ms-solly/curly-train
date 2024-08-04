// pages/matches.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { BsWifi2 } from 'react-icons/bs';

interface Match {
  id: number;
  radiantWin: boolean;
  duration: string;
  avgMmr: number | string;
  gameMode: number;
}

const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.opendota.com/api/publicMatches')
      .then(response => response.json())
      .then(data => {
        const fetchedMatches = data.slice(0, 50).map((match: any) => ({
          id: match.match_id,
          radiantWin: match.radiant_win,
          duration: formatDuration(match.duration),
          avgMmr: match.avg_mmr != null ? Math.round(match.avg_mmr) : 'Unknown',
          gameMode: match.game_mode
        }));
        setMatches(fetchedMatches);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        setLoading(false);
      });
  }, []);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const SkeletonCard = () => (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-full animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="mt-2 h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Live Matches</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {loading
            ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
            : matches.map((match) => (
              <div key={match.id} className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-red-700 font-bold flex items-center">
                    <BsWifi2 className="mr-1 mb-2 animate-ping" />
                    <span> LIVE</span>
                  </div>
                  <div className="text-gray-400 text-xs">ID: {match.id}</div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-white font-bold text-sm">
                    {match.radiantWin ? 'Radiant' : 'Dire'} Win
                  </div>
                  <div className="text-gray-400 text-xs">{match.duration}</div>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
                  <div>Avg MMR: {match.avgMmr !== 'Unknown' ? match.avgMmr : 'Unknown'}</div>
                  <div>Mode: {match.gameMode}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
