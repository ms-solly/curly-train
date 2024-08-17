"use client";
import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getProPlayers = async () => 
    action('proPlayers', config.API_HOST, 'api/proplayers');

const ProPlayersPage: React.FC = () => {
    const [proPlayers, setProPlayers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proPlayersData = await getProPlayers();
                
                // Check if proPlayersData has a payload
                if ('payload' in proPlayersData) {
                    setProPlayers(proPlayersData.payload);
                } else {
                    console.error("Error fetching data:", proPlayersData.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Pagination logic
    const indexOfLastPlayer = currentPage * itemsPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - itemsPerPage;
    const currentProPlayers = proPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const totalItems = proPlayers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="p-4 bg-cover bg-center min-h-screen">
            <div className="p-8 shadow-lg bg-opacity-50">
                <h1 className="text-4xl font-bold mb-4 text-center text-white-800 font-rubik scrollbar-track-slate-800">Pro Players</h1>
                {proPlayers.length > 0 ? (
                    <div>
                        <table className="min-w-full text-white rounded-lg overflow-hidden shadow-md backdrop-blur-md bg-white/5 p-4 border border-gray-200">
                            <thead>
                                <tr className="font-rubik bg-white/10 backdrop-blur-md text-sky-300">
                                    <th className="px-3 py-2 text-left">Name</th>
                                    <th className="px-3 py-2 text-left">Team</th>
                                    <th className="px-3 py-2 text-left">Country</th>
                                    <th className="px-3 py-2 text-left">Last Login</th>
                                    <th className="px-3 py-2 text-left">Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProPlayers.map((player: any) => (
                                    <tr key={player.steamid} className="border-b border-gray-700 hover:bg-sky-200 hover:text-gray-800">
                                        <td className="px-4 py-2 flex items-center hover:text-white">
                                            <Link href={`/proplayers/${player.steamid}`} className="flex items-center text-sky-400 font-bold font-rubik hover:text-white">
                                                <Image src={player.avatarfull} alt={player.personaname} width={48} height={48} className="w-12 h-12 object-cover rounded-full mr-2" />
                                                {player.personaname}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 font-rubik">{player.team_name}</td>
                                        <td className="px-4 py-2 font-rubik">{player.loccountrycode || 'N/A'}</td>
                                        <td className="px-4 py-2 font-rubik">{new Date(player.last_login).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 font-rubik">
                                            <Button className="bg-sky-500 hover:bg-sky-700 rounded-md px-3 h-8 hover:text-white">
                                                <Link href={`/proplayers/${player.steamid}`}>View Profile</Link>
                                            </Button>
                                        </td>
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
                    </div>
                ) : (
                    <p>Loading pro players...</p>
                )}
            </div>
        </div>
    );
};

export default ProPlayersPage;
