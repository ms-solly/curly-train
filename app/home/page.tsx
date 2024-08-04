"use client"
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

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
    const fetchMatchDetails = async (match_id: number) => {
      try {
        const response = await fetch(`https://api.opendota.com/api/matches/${match_id}`);
        const data = await response.json();
        return {
          match_id: data.match_id,
          radiant_name: data.radiant_team?.name || 'Radiant',
          dire_name: data.dire_team?.name || 'Dire',
          radiant_logo: data.radiant_team?.logo_url || 'https://raw.githubusercontent.com/ms-solly/curly-train/64db1b64ea20490e23a08a571ca8424cdb6fceeb/public/images/teamLogo.png',
          dire_logo: data.dire_team?.logo_url || 'https://raw.githubusercontent.com/ms-solly/curly-train/64db1b64ea20490e23a08a571ca8424cdb6fceeb/public/images/teamLogo.png',
          series_type: data.series_type,
          radiant_win: data.radiant_win,
          duration: data.duration,
          avg_mmr: data.avg_mmr,
          game_mode: data.game_mode,
          start_time: data.start_time,
        };
      } catch (error) {
        console.error('Error fetching match details:', error);
        return null;
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await fetch('https://api.opendota.com/api/proMatches');
        const data = await response.json();
        const matchDetailsPromises = data.slice(0, 10).map((match: any) => fetchMatchDetails(match.match_id));
        const detailedMatches = await Promise.all(matchDetailsPromises);
        setMatches(detailedMatches.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
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

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto p-4 flex ">
          <div className="w-3/4 p-4">
            <h1 className="text-3xl font-bold mb-4">Current Matches</h1>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Time</th>
                    <th className="py-3 px-6 text-left">Teams</th>
                    <th className="py-3 px-6 text-left">Series</th>
                    <th className="py-3 px-6 text-left">Game Mode</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {matches.map(match => (
                    <tr key={match.match_id} className="border-b border-gray-700 hover:bg-green-300 hover:text-gray-800">
                      <td className="py-3 px-6 text-left">
                        {match.start_time * 1000 < Date.now() ? (
                          <span className="text-green-500">Live</span>
                        ) : (
                          <span className="text-yellow-500">Upcoming</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-left">{formatDate(match.start_time)}</td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <img src={match.radiant_logo} alt={match.radiant_name} className="w-8 h-8 mr-2" />
                          <span className="font-bold">{match.radiant_name}</span>
                          <span className="mx-2">vs</span>
                          <img src={match.dire_logo} alt={match.dire_name} className="w-8 h-8 mr-2" />
                          <span className="font-bold">{match.dire_name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">{seriesType(match.series_type)}</td>
                      <td className="py-3 px-6 text-left">{match.game_mode}</td>
                    </tr>
                  ))}
                </tbody>
               
              </table>
            )}
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
