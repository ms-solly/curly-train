"use client";
import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
                        <Table className="rounded-lg shadow-md backdrop-blur-md bg-white/5 p-4 border border-gray-200">
                            <TableHeader className='bg-black hover:bg-black'>
                                <TableRow className="font-rubik bg-black hover:bg-black backdrop-blur-md text-green-300">
                                    <TableHead className="px-3 py-2 text-left">Name</TableHead>
                                    <TableHead className="px-3 py-2 text-left">Team</TableHead>
                                    <TableHead className="px-3 py-2 text-left">Country</TableHead>
                                    <TableHead className="px-3 py-2 text-left">Last Login</TableHead>
                                    <TableHead className="px-3 py-2 text-left">Profile</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentProPlayers.map((player: any) => (
                                    <TableRow key={player.steamid} className="border-b border-gray-700 hover:bg-green-200 hover:text-gray-800">
                                        <TableCell className="px-4 py-2 flex items-center hover:text-white">
                                            <Link href={`/proplayers/${player.steamid}`} className="flex items-center text-green-400 font-bold font-rubik hover:text-white">
                                                <Image src={player.avatarfull} alt={player.personaname} width={48} height={48} className="w-12 h-12 object-cover rounded-full mr-2" />
                                                {player.personaname}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="px-4 py-2 font-rubik">{player.team_name}</TableCell>
                                        <TableCell className="px-4 py-2 font-rubik">{player.loccountrycode || 'N/A'}</TableCell>
                                        <TableCell className="px-4 py-2 font-rubik">{new Date(player.last_login).toLocaleDateString()}</TableCell>
                                        <TableCell className="px-4 py-2 font-rubik">
                                            <Button className="bg-green-500 hover:bg-green-700 rounded-md px-3 h-8 hover:text-white">
                                                <Link href={`/proplayers/${player.steamid}`}>View Profile</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
