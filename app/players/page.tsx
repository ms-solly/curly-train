"use client";
import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';

const getProPlayers = async () => 
    action('proPlayers', config.API_HOST, 'api/proPlayers');

const ProPlayersPage: React.FC = () => {
    const [proPlayers, setProPlayers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proPlayersData = await getProPlayers();
                setProPlayers(proPlayersData.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/_next/static/media/bg.720ca035.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="p-8 shadow-lg bg-opacity-50">
                <h1 className="text-5xl font-bold mb-4 text-center text-white-800 font-rubik scrollbar-track-slate-800 ">Pro Players</h1>
                {proPlayers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="min-w-full  text-white rounded-lg overflow-hidden shadow-md backdrop-blur-md bg-white/5 p-4 border border-gray-200">
                                <thead>
                                    <tr className="font-rubik bg-white/10 backdrop-blur-md text-sky-300">
                                        <th className="px-3 py-2 text-left ">Name</th>
                                        <th className="px-3 py-2 text-left">Team</th>
                                        <th className="px-3 py-2 text-left">Country</th>
                                        <th className="px-3 py-2 text-left">Last Login</th>
                                        <th className="px-3 py-2 text-left">Profile</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {proPlayers.map((player: any) => (
                                        <tr key={player.steamid} className="border-b border-gray-700 hover:bg-sky-200 hover:text-gray-800">
                                            <td className="px-4 py-2 flex items-center hover:text-white">
                                                <a href={player.profileurl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sky-400 font-bold font-rubik hover:text-white">
                                                    <img src={player.avatarfull} alt={player.personaname} className="w-12 h-12 object-cover rounded-full mr-2 " />
                                                    {player.personaname}
                                                </a>
                                            </td>
                                            <td className="px-4 py-2 font-rubik">{player.team_name}</td>
                                            <td className="px-4 py-2 font-rubik">{player.loccountrycode || 'N/A'}</td>
                                            <td className="px-4 py-2 font-rubik">{new Date(player.last_login).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 font-rubik">
                                                <button className="bg-sky-500 hover:bg-sky-700 rounded-md px-3 h-8 hover:text-white"><a href={player.profileurl} target="_blank">View Profile</a></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Loading pro players...</p>
                )}
            </div>
        </div>
    );
};

export default ProPlayersPage;
