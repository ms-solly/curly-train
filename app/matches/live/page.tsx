"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { CornerButton } from '@/components/ui/card';

const fetchData = async () => {
    try {
        const response = await axios.get('https://api.opendota.com/api/live');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

// Helper function to convert seconds to minutes and seconds
const formatGameTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
};

const LiveDataPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const liveData = await fetchData();
            if (liveData) setData(liveData);
            setLoading(false);
        };

        loadData();
    }, []);

    if (!data) {
        return <p>Error fetching live matches data</p>;
    }

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
        <div className="flex flex-col w-full min-h-screen bg-background">
            <main className="container mx-auto p-4"></main>
            <Card>
                <CardHeader className="">
                    <CardTitle className="">Live Matches</CardTitle>
                    
                    <CornerButton href="/matches/past">Past matches</CornerButton>

                </CardHeader>
                <CardContent>
                    {loading ? (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-black hover:bg-black">
                                            <TableHead className="px-4 py-2 text-left">Match ID</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Game Time</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Spectators</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Radiant Score</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Dire Score</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Average MMR</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Radiant Lead</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Game Mode</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({ length: itemsPerPage }).map((_, index) => (
                                            <TableRow key={index} className="border-b border-gray-200 animate-pulse">
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-24"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-20"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-12"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-10"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-10"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-14"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-14"></div></TableCell>
                                                <TableCell className="px-4 py-2"><div className="h-4 bg-gray-300 rounded w-16"></div></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    ) : currentItems.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-black hover:bg-black">
                                            <TableHead className="px-4 py-2 text-left">Match ID</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Game Time</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Spectators</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Radiant Score</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Dire Score</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Average MMR</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Radiant Lead</TableHead>
                                            <TableHead className="px-4 py-2 text-left">Game Mode</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentItems.map((match: any) => (
                                            <TableRow
                                                key={match.match_id}
                                                className="cursor-pointer"
                                                onClick={() => handleRowClick(match.match_id)}
                                            >
                                                <TableCell className="px-4 py-2">
                                                    <Link href={`/matches/${match.match_id}`}>
                                                        <p className="underline hover:no-underline text-white">{match.match_id}</p>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="px-4 py-2">{formatGameTime(match.game_time)}</TableCell>
                                                <TableCell className="px-4 py-2">{match.spectators}</TableCell>
                                                <TableCell className="px-4 py-2">{match.radiant_score}</TableCell>
                                                <TableCell className="px-4 py-2">{match.dire_score}</TableCell>
                                                <TableCell className="px-4 py-2">{match.average_mmr}</TableCell>
                                                <TableCell className="px-4 py-2">{match.radiant_lead}</TableCell>
                                                <TableCell className="px-4 py-2">{match.game_mode}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
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
                </CardContent>
            </Card>
        </div>
    );
};

export default LiveDataPage;
