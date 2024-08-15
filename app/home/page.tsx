"use client";
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [error, setError] = useState<string | null>(null);
  const matchId = matches.length > 0 ? matches[0].match_id : 0; // Default to 0 if no matches

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
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const matchDetailsPromises = data.slice(0, 10).map((match: any) => fetchMatchDetails(match.match_id));
        const detailedMatches = await Promise.all(matchDetailsPromises);
        setMatches(detailedMatches.filter(Boolean));
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to fetch matches. Please try again later.');
      } finally {
        setLoading(false);
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
      
     
      <div className="relative min-h-screen text-white">
        <Image
          src="/_next/static/media/bg.720ca035.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-70"
        />
        <div className="container relative z-10 mx-auto flex flex-col gap-4 p-4 lg:flex-row">
          {/* Matches Table */}
          <div className="min-w-0 flex-1">
            <h1 className="mb-4 font-rubik text-4xl font-bold">Current Matches</h1>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white/5 p-4 text-white shadow-md backdrop-blur-md">
                  <thead>
                    <tr className=" bg-white/10 font-rubik backdrop-blur-md">
                      <th className="px-4 py-3 text-left text-xs md:text-sm">Status</th>
                      <th className="px-4 py-3 text-left text-xs md:text-sm">Time</th>
                      <th className="px-4 py-3 text-center text-xs md:text-sm">Teams</th>
                      <th className="px-4 py-3 text-left text-xs md:text-sm">Series</th>
                      <th className="px-4 py-3 text-left text-xs md:text-sm">Game Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map(match => (
                      <tr key={match.match_id} className="border-b border-gray-700 hover:bg-green-300 hover:text-gray-800">
                        <td className="px-4 py-3 text-left text-xs md:text-sm">
                          {match.start_time * 1000 < Date.now() ? (
                            <span className="font-rubik text-green-500">Live</span>
                          ) : (
                            <span className="font-rubik text-yellow-500">Upcoming</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-left font-rubik text-xs md:text-sm">{formatDate(match.start_time)}</td>
                        <td className="px-4 py-3 text-left font-rubik text-xs md:text-sm">
                          <div className="flex flex-wrap items-center gap-2 font-rubik">
                            <img src={match.radiant_logo} alt={match.radiant_name} className="size-6 rounded-full md:size-8" />
                            <span className="font-bold">{match.radiant_name}</span>
                            <span className="mx-2 text-center">vs</span>
                            <img src={match.dire_logo} alt={match.dire_name} className="size-6 rounded-full md:size-8" />
                            <span className="font-bold">{match.dire_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-left font-rubik text-xs md:text-sm">{seriesType(match.series_type)}</td>
                        <td className="px-4 py-3 text-left font-rubik text-xs md:text-sm">{match.game_mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

         
          <div className="mt-1 w-full p-3 lg:mt-11 lg:w-1/4">
            <div className="h-fit rounded-xl border border-gray-200 bg-white/10 p-4 shadow-lg backdrop-blur-md">
              <h2 className="mb-4 font-rubik text-2xl font-bold">Chat</h2>
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default Home;
