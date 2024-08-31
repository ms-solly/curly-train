"use client"
import axios from 'axios';
import { FaTrophy } from 'react-icons/fa';
import PerformanceGraph from '@/components/PerformanceGraph ';

// Fetch match data
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const MatchProfile = async ({ params: { id } }: { params: { id: string } }) => {
    const data = await fetcher(`https://api.opendota.com/api/matches/${id}`);

    if (!data) {
        return <div>Loading...</div>;
    }

    const steamUrl = `https://www.opendota.com/matches/${id}`;

    // Ensure radiant_team and dire_team are arrays
    const radiantTeam = data.radiant_team || [];
    const direTeam = data.dire_team || [];
    
    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-6xl mx-auto rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-bold mb-4">Match ID: {data.match_id}</h1>

                {/* Match Summary */}
                <div className="mb-6 flex flex-col lg:flex-row items-center">
                    {/* Display win icon based on the result */}
                    <div className="flex items-center mr-4 mb-4 lg:mb-0">
                        {data.radiant_win ? (
                            <div className="flex items-center text-green-600">
                                <FaTrophy className="text-3xl mr-2" />
                                <span className="text-2xl font-semibold">Radiant Win</span>
                            </div>
                        ) : (
                            <div className="flex items-center text-red-600">
                                <FaTrophy className="text-3xl mr-2" />
                                <span className="text-2xl font-semibold">Dire Win</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Match Summary</h2>
                                <p><strong>Game Mode:</strong> {data.game_mode}</p>
                                <p><strong>Duration:</strong> {data.duration} seconds</p>
                                <p><strong>Start Time:</strong> {new Date(data.start_time * 1000).toLocaleString()}</p>
                                <p><strong>Radiant Win:</strong> {data.radiant_win ? 'Yes' : 'No'}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Scores</h2>
                                <p><strong>Radiant Score:</strong> {data.radiant_score}</p>
                                <p><strong>Dire Score:</strong> {data.dire_score}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teams */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Teams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Radiant Team</h3>
                            <ul className="list-disc pl-5">
                                {radiantTeam.map((player: any) => (
                                    <li key={player.account_id}>
                                        {player.personaname || 'Anonymous'} - {player.hero_id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Dire Team</h3>
                            <ul className="list-disc pl-5">
                                {direTeam.map((player: any) => (
                                    <li key={player.account_id}>
                                        {player.personaname || 'Anonymous'} - {player.hero_id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Player Statistics */}
                <div className="overflow-x-auto">
                    <h2 className="text-2xl font-semibold mb-2">Player Statistics</h2>
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2 text-left">Player</th>
                                <th className="px-4 py-2 text-left">Hero</th>
                                <th className="px-4 py-2 text-left">Kills</th>
                                <th className="px-4 py-2 text-left">Deaths</th>
                                <th className="px-4 py-2 text-left">Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.players.map((player: any) => (
                                <tr key={player.account_id} className="border-b border-gray-200">
                                    <td className="px-4 py-2">{player.personaname || 'Anonymous'}</td>
                                    <td className="px-4 py-2">{player.hero_id}</td>
                                    <td className="px-4 py-2">{player.kills}</td>
                                    <td className="px-4 py-2">{player.deaths}</td>
                                    <td className="px-4 py-2">{player.assists}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='my-10'>
                <PerformanceGraph goldAdv={data.radiant_gold_adv} xpAdv={data.radiant_xp_adv} matchId={data.match_id} />
                </div>
                {/* See on Steam Button */}
                <div className="mt-6">
                    <a href={steamUrl} target="_blank" rel="noopener noreferrer">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            See on Steam
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MatchProfile;
