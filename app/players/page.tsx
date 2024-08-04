"use client"
import Header from '@/components/Header';
import PlayerCard from '@/components/PlayerCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchPlayerData = async (accountId: number) => {
  const response = await fetch(`https://api.opendota.com/api/players/${accountId}`);
  if (!response.ok) throw new Error('Failed to fetch player data');
  return response.json();
};

const fetchWinLossData = async (accountId: number) => {
  const response = await fetch(`https://api.opendota.com/api/players/${accountId}/wl`);
  if (!response.ok) throw new Error('Failed to fetch win/loss data');
  return response.json();
};

const fetchRecentMatches = async (accountId: number) => {
  const response = await fetch(`https://api.opendota.com/api/players/${accountId}/recentMatches`);
  if (!response.ok) throw new Error('Failed to fetch recent matches');
  return response.json();
};

const PlayerPage = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get('accountId');

  const [playerData, setPlayerData] = useState(null);
  const [winLossData, setWinLossData] = useState(null);
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accountId) {
      const fetchData = async () => {
        try {
          const player = await fetchPlayerData(Number(accountId));
          setPlayerData(player);

          const winLoss = await fetchWinLossData(Number(accountId));
          setWinLossData(winLoss);

          const recent = await fetchRecentMatches(Number(accountId));
          setRecentMatches(recent);

          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [accountId]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
          <div>Error: {error}</div>
        </div>
      </>
    );
  }

  if (!playerData || !winLossData) {
    return (
      <>
        <Header />
        <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
          <div>No data available</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Player Details</h1>
          <PlayerCard player={playerData} winLoss={winLossData} recentMatches={recentMatches} />
        </div>
      </div>
    </>
  );
};

export default PlayerPage;
