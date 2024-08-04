import React from 'react';

const PlayerCard = ({ player, winLoss, recentMatches }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <img src={player.profile.avatarfull} alt={player.profile.personaname} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{player.profile.personaname}</h2>
          <p>{player.profile.name}</p>
          <p>Country: {player.profile.loccountrycode}</p>
          <p>Rank: {player.rank_tier}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Win/Loss</h3>
        <p>Wins: {winLoss.win}</p>
        <p>Losses: {winLoss.lose}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Recent Matches</h3>
        <ul>
          {recentMatches.map(match => (
            <li key={match.match_id}>Match ID: {match.match_id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerCard;
