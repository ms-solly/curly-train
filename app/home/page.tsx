"use client"
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Match } from '@/types/match';


const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const matchId = 3703866531;

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
      <div className="relative min-h-screen text-white">
        <Image
          src="/_next/static/media/bg.720ca035.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-50"
        />
        <div className="relative z-10 container mx-auto p-4 flex flex-wrap">
          <div className="w-full lg:w-3/4 p-4">
            <div>
              <h1 className="text-4xl font-bold mb-4 font-rubik">Current Matches</h1>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-white rounded-lg overflow-hidden shadow-md backdrop-blur-md bg-white/5 p-4 border border-gray-200">
                    <thead>
                      <tr className=" font-rubik bg-white/10 backdrop-blur-md">
                        <th className="py-3 px-4 text-left text-xs md:text-sm">Status</th>
                        <th className="py-3 px-4 text-left text-xs md:text-sm">Time</th>
                        <th className="py-3 px-4 text-center text-xs md:text-sm">Teams</th>
                        <th className="py-3 px-4 text-left text-xs md:text-sm">Series</th>
                        <th className="py-3 px-4 text-left text-xs md:text-sm">Game Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map(match => (
                        <tr key={match.match_id} className="border-b border-gray-700 hover:bg-green-300 hover:text-gray-800">
                          <td className="py-3 px-4 text-left text-xs md:text-sm">
                            {match.start_time * 1000 < Date.now() ? (
                              <span className="text-green-500 font-rubik">Live</span>
                            ) : (
                              <span className="text-yellow-500 font-rubik">Upcoming</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-left text-xs md:text-sm font-rubik">{formatDate(match.start_time)}</td>
                          <td className="py-3 px-4 text-left text-xs md:text-sm font-rubik">
                            <div className="flex items-center flex-wrap gap-2 font-rubik">
                              <img src={match.radiant_logo} alt={match.radiant_name} className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                              <span className="font-bold">{match.radiant_name}</span>
                              <span className="mx-2 text-center">vs</span>
                              <img src={match.dire_logo} alt={match.dire_name} className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                              <span className="font-bold">{match.dire_name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-left text-xs md:text-sm font-rubik">{seriesType(match.series_type)}</td>
                          <td className="py-3 px-4 text-left text-xs md:text-sm font-rubik">{match.game_mode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
           <div className="w-full lg:w-1/4 p-4 mt-1 lg:mt-20">
  <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 shadow-lg border border-gray-200">
    <h2 className="text-xl font-bold mb-4 font-rubik">Chat</h2>
    <div className="chatBoxWrapper">
      <Chat />
    </div>
  </div>
        </div>
      </div>
        </div>
    </>
  ); 
};

export default Home;
