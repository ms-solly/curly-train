"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('https://api.opendota.com/api/live');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const LiveDataPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const liveData = await fetchData();
            setData(liveData);
        };

        loadData();
    }, []);

    if (data.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Live Matches Data</h1>
            {data.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-4 py-2 text-left">Match ID</th>
                            <th className="px-4 py-2 text-left">Game Time</th>
                            <th className="px-4 py-2 text-left">Spectators</th>
                            <th className="px-4 py-2 text-left">Radiant Score</th>
                            <th className="px-4 py-2 text-left">Dire Score</th>
                            <th className="px-4 py-2 text-left">Average MMR</th>
                            <th className="px-4 py-2 text-left">Radiant Lead</th>
                            <th className="px-4 py-2 text-left">Game Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((match: any) => (
                            <tr key={match.match_id} className="border-b border-gray-200">
                                <td className="px-4 py-2">{match.match_id}</td>
                                <td className="px-4 py-2">{match.game_time} seconds</td>
                                <td className="px-4 py-2">{match.spectators}</td>
                                <td className="px-4 py-2">{match.radiant_score}</td>
                                <td className="px-4 py-2">{match.dire_score}</td>
                                <td className="px-4 py-2">{match.average_mmr}</td>
                                <td className="px-4 py-2">{match.radiant_lead}</td>
                                <td className="px-4 py-2">{match.game_mode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No live matches data available.</p>
            )}
        </div>
    );
};

export default LiveDataPage;
