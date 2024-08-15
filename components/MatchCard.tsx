import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import Image from 'next/image';

interface Match {
  match_id: number;
  radiant_name: string;
  dire_name: string;
  radiant_logo: string;
  dire_logo: string;
  radiant_win: boolean;
  duration: number;
  start_time: number;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  return date.toLocaleDateString(undefined, options);
};

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const endTime = match.start_time + match.duration;

  return (
    <div key={match.match_id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {match.radiant_win && <FaTrophy className="text-yellow-500 mr-2" />}
          <Image src={match.radiant_logo} alt={match.radiant_name} className="w-8 h-8 mr-2" />
          <span className="font-bold">{match.radiant_name}</span>
        </div>
        <span className="text-gray-400">vs</span>
        <div className="flex items-center">
          {!match.radiant_win && <FaTrophy className="text-yellow-500 mr-2" />}
          <Image src={match.dire_logo} alt={match.dire_name} className="w-8 h-8 mr-2" />
          <span className="font-bold">{match.dire_name}</span>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <span className={`font-bold ${match.radiant_win ? 'text-green-500' : 'text-red-500'}`}>
          {match.radiant_win ? 'Radiant Win' : 'Dire Win'}
        </span>
        <span className="text-gray-400">ID: {match.match_id}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Duration: {formatDuration(match.duration)}</span>
        <span>End Time: {formatDate(endTime)}</span>
      </div>
    </div>
  );
};

export default MatchCard;
