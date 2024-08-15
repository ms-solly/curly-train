"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';


const TeamDetails = ({ teamId }) => {
  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the most recent match
      const recentMatch = await fetchRecentMatchForTeam(teamId);
      setMatch(recentMatch);

      // Fetch players and heroes
      const playerDetails = await fetchPlayersForTeam(teamId);
      const heroDetails = await fetchHeroesForTeam(teamId);

      setPlayers(playerDetails);
      setHeroes(heroDetails);
    };

    fetchData();
  }, [teamId]);

  if (!match || !players.length || !heroes.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Most Recent Match</h1>
      <div>
        <h2>Match Details</h2>
        <p>Match ID: {match.match_id}</p>
        <p>Radiant Win: {match.radiant_win ? 'Yes' : 'No'}</p>
        <p>Radiant Score: {match.radiant_score}</p>
        <p>Dire Score: {match.dire_score}</p>
        <p>Duration: {match.duration} seconds</p>
        <p>Start Time: {new Date(match.start_time * 1000).toLocaleString()}</p>
        <p>League: {match.league_name}</p>
        <p>Opposing Team: {match.opposing_team_name}</p>
        <img src={match.opposing_team_logo} alt={match.opposing_team_name} style={{ width: '100px' }} />
      </div>

      <h2>Players</h2>
      <div className="flex space-x-4">
        {players.map(player => (
          <div key={player.account_id} className="flex-shrink-0">
            <p>{player.name}</p>
            <p>Games Played: {player.games_played}</p>
            <p>Wins: {player.wins}</p>
          </div>
        ))}
      </div>

      <h2>Heroes</h2>
      <div className="flex space-x-4">
        {heroes.map(hero => (
          <div key={hero.hero_id} className="flex-shrink-0">
            <p>{hero.name}</p>
            {/* Add hero images if available */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
