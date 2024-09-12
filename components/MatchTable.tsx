import React from 'react';

const MatchTable = ({ matches }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teams</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broadcast</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {matches.map((match) => (
          <tr key={match.match_id}>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(match.start_time * 1000).toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{`${match.radiant_team.name} vs ${match.dire_team.name}`}</td>
            <td className="px-6 py-4 whitespace-nowrap">{match.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a href={`https://www.twitch.tv/stream/${match.broadcast_link}`} target="_blank" rel="noopener noreferrer">Watch</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchTable;