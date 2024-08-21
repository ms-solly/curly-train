"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);  // Set loading to true before fetching data
            const liveData = await fetchData();
            if (liveData) setData(liveData);
            setLoading(false);  // Set loading to false after data is fetched
        };

        loadData();
    }, []);

    if (!data) {
        return <p>Error fetching live matches data</p>;
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = data.length;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleNext = () => setCurrentPage((prev) => Math.min(Math.ceil(totalItems / itemsPerPage), prev + 1));
    const handlePrevious = () => setCurrentPage((prev) => Math.max(1, prev - 1));

    const handleRowClick = (matchId: number) => {
        window.location.href = `/matches/${matchId}`;
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Live Matches Data</h1>
            {loading ? (
                <>
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-800 border-b border-gray-200">
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
                            {Array.from({ length: itemsPerPage }).map((_, index) => (
                                <tr key={index} className="border-b border-gray-200 animate-pulse">
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-24"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-12"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-10"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-10"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-14"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-14"></div></td>
                                    <td className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-16"></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : currentItems.length > 0 ? (
                <>
                    <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-800 border-b border-gray-200">
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
                            {currentItems.map((match: any) => (
                                <tr
                                    key={match.match_id}
                                    className="border-b border-gray-200 hover:bg-green-300 hover:text-gray-800 cursor-pointer"
                                    onClick={() => handleRowClick(match.match_id)}
                                >
                                    <td className="px-4 py-2">
                                        <Link href={`/matches/${match.match_id}`}>
                                            <p className="text-blue-500 hover:underline">{match.match_id}</p>
                                        </Link>
                                    </td>
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
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={paginate}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        currentPage={currentPage}
                    />
                </>
            ) : (
                <p>No live matches data available.</p>
            )}
        </div>
    );
};

export default LiveDataPage;
