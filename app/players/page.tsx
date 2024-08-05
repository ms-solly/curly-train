"use client";
import Header from "@/components/Header";
import PlayerCard, { PlayerData, WinLossData, Match } from "@/components/PlayerCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchPlayerData = async (accountId: number) => {
  const response = await fetch(`https://api.opendota.com/api/players/${accountId}`);
  if (!response.ok) throw new Error(`Failed to fetch player data: ${response.statusText}`);
  const data = await response.json();
  console.log("Player Data:", data); // Log player data
  return data;
};

const fetchWinLossData = async (accountId: number) => {
  const response = await fetch(`https://api.opendota.com/api/players/${accountId}/wl`);
  if (!response.ok) throw new Error(`Failed to fetch win/loss data: ${response.statusText}`);
  const data = await response.json();
  console.log("Win/Loss Data:", data); // Log win/loss data
  return data;
};

const fetchRecentMatches = async (accountId: number) => {
  const response = await fetch(`https://api.opendota.com/api/players/${accountId}/recentMatches`);
  if (!response.ok) throw new Error(`Failed to fetch recent matches: ${response.statusText}`);
  const data = await response.json();
  console.log("Recent Matches:", data); // Log recent matches
  return data;
};

const PlayerPage = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [winLossData, setWinLossData] = useState<WinLossData | null>(null);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        } catch (err) {
          console.error("Error fetching data:", err);
          setError((err as Error).message);
        }
      };

      fetchData();
    }
  }, [accountId]);

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div>Error: {error}</div>
        </div>
      </>
    );
  }

  if (!playerData || !winLossData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div>No data available</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-3xl font-bold">Player Details</h1>
          <div className="mb-4">
            <strong>Player:</strong> {playerData.profile.personaname}
          </div>
          <div className="mb-4">
            <strong>Team:</strong> {playerData.team_name || 'N/A'}
          </div>
          <div className="mb-4">
            <strong>Country:</strong> {playerData.profile.loccountrycode || 'N/A'}
          </div>
          <div className="mb-4">
            <strong>Role:</strong> {playerData.profile.role || 'N/A'}
          </div>
          <div className="mb-4">
            <strong>Matches:</strong> {recentMatches.length}
          </div>
          <div className="mb-4">
            <strong>Rank:</strong> {playerData.rank_tier || 'N/A'}
          </div>
          <PlayerCard player={playerData} winLoss={winLossData} recentMatches={recentMatches} />
        </div>
      </div>
    </>
  );
};

export default PlayerPage;
