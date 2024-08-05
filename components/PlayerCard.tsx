import React from "react";
import Image from "next/image";

interface Profile {
  role: string;
  account_id: number;
  personaname: string;
  name: string;
  plus: boolean;
  cheese: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login: string;
  loccountrycode: string;
  is_contributor: boolean;
  is_subscriber: boolean;
}

export interface PlayerData {
  team_name: string;
  solo_competitive_rank: number;
  competitive_rank: number;
  rank_tier: number;
  leaderboard_rank: number;
  profile: Profile;
}

export interface WinLossData {
  win: number;
  lose: number;
}

export interface Match {
  match_id: number;
  [key: string]: any;
}

interface PlayerCardProps {
  player: PlayerData;
  winLoss: WinLossData;
  recentMatches: Match[];
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, winLoss, recentMatches }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Image src={player.profile.avatarfull} alt={player.profile.personaname} width={64} height={64} className="mr-4 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{player.profile.personaname}</h2>
          <p>{player.profile.name}</p>
          <p>Country: {player.profile.loccountrycode}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold">Rankings</h3>
        <p>Solo Competitive Rank: {player.solo_competitive_rank}</p>
        <p>Competitive Rank: {player.competitive_rank}</p>
        <p>Rank Tier: {player.rank_tier}</p>
        <p>Leaderboard Rank: {player.leaderboard_rank}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold">Win/Loss</h3>
        <p>Wins: {winLoss.win}</p>
        <p>Losses: {winLoss.lose}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold">Recent Matches</h3>
        <ul>
          {recentMatches.map((match) => (
            <li key={match.match_id}>Match ID: {match.match_id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerCard;
