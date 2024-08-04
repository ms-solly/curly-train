"use client"
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { BsWifi2 } from 'react-icons/bs';

interface Match {
  match_id: number;
  radiant_name: string;
  dire_name: string;
  radiant_logo: string;
  dire_logo: string;
  series_type: number;
  radiant_win: boolean;
  duration: number;
  avg_mmr: number | null;
  game_mode: number;
  start_time: number;
}

const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.opendota.com/api/proMatches')
      .then(response => response.json())
      .then(data => {
        const enrichedMatches = data.slice(0, 50).map((match: any) => ({
          match_id: match.match_id,
          radiant_name: match.radiant_name || 'Radiant',
          dire_name: match.dire_name || 'Dire',
          radiant_logo: match.radiant_logo || 'default_radiant_logo_url', // Replace with actual logo URLs if available
          dire_logo: match.dire_logo || 'default_dire_logo_url', // Replace with actual logo URLs if available
          series_type: match.series_type,
          radiant_win: match.radiant_win,
          duration: match.duration,
          avg_mmr: match.avg_mmr,
          game_mode: match.game_mode,
          start_time: match.start_time,
        }));
        setMatches(enrichedMatches);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const seriesType = (type: number): string => {
    switch (type) {
      case 0:
        return 'BO1';
      case 1:
        return 'BO3';
      case 2:
        return 'BO5';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto p-4 flex">
          <div className="w-3/4 p-4">
            <h1 className="text-3xl font-bold mb-4">Current Matches</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {loading ? (
                <div>Loading...</div>
              ) : (
                matches.map(match => (
                  <div key={match.match_id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img src={match.radiant_logo} alt={match.radiant_name} className="w-8 h-8 mr-2" />
                        <span className="font-bold">{match.radiant_name}</span>
                      </div>
                      <span className="text-gray-400">vs</span>
                      <div className="flex items-center">
                        <img src={match.dire_logo} alt={match.dire_name} className="w-8 h-8 mr-2" />
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
                      <span>Avg MMR: {match.avg_mmr || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Game Mode: {match.game_mode}</span>
                      <span>Series: {seriesType(match.series_type)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Start Time: {new Date(match.start_time * 1000).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            <p>Chat messages here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
