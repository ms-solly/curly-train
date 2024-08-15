"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchTeamsInp from '@/components/teams/SearchTeams';
import TeamsCard from '@/components/teams/TeamsCard';
import Image from 'next/image';

// Define interfaces based on your API response
interface Player {
    id: number;
    name: string;
    role: string;
}

interface Team {
    id: number;
    name: string;
    logo: string;
    win_rate: number;
    players: Player[];
}

const fetchTeamsData = async (): Promise<Team[]> => {
    try {
        const response = await fetch('https://api.opendota.com/api/teams'); // Replace with actual API endpoint
        const data = await response.json();
        
        // Adjust based on actual response structure
        console.log("Fetched teams data:", data);

        return data.map((team: any) => ({
            id: team.team_id, // Replace with actual key
            name: team.name, // Replace with actual key
            logo: team.logo_url || '/default-logo.png', // Replace with actual key
            win_rate: team.rating || 0, // Adjust if needed
            players: (team.players || []).map((player: any) => ({
                id: player.id, // Replace with actual key
                name: player.name, // Replace with actual key
                role: player.role || 'Unknown' // Replace with actual key
            }))
        }));
    } catch (error) {
        console.error("Error fetching teams data:", error);
        return [];
    }
};

const Teamspg: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    useEffect(() => {
        const loadTeamsData = async () => {
            try {
                const data = await fetchTeamsData();
                setTeams(data);
            } catch (error) {
                console.error("Error fetching teams data:", error);
            }
        };

        loadTeamsData();
    }, []);

    // Pagination logic
    const indexOfLastTeam = currentPage * itemsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <SearchTeamsInp />
                <div className="p-4 bg-white/80 rounded-lg shadow-lg">
                    <h1 className="text-4xl text-center font-bold mb-6">Teams</h1>
                    <TeamsTable teams={currentTeams} />
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={teams.length}
                        paginate={paginate}
                    />
                </div>
            </div>
    );
};

interface TeamsTableProps {
    teams: Team[];
}


const TeamsTable: React.FC<TeamsTableProps> = ({ teams }) => {
    return (
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-sky-700 text-white">
                <tr>
                    <th className="px-6 py-3 text-left">Logo</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Win Rate</th>
                    <th className="px-6 py-3 text-left">Players</th>
                </tr>
            </thead>
            <tbody className="bg-gray-100">
                {teams.map(team => (
                    <tr key={team.id} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                            <Image src={team.logo} alt={`${team.name} logo`} width={30} height={30} className="w-16 h-16 object-cover" />
                        </td>
                        <td className="px-6 py-4 font-semibold">{team.name}</td>
                        <td className="px-6 py-4">{team.win_rate || 'N/A'}%</td>
                        <td className="px-6 py-4">
                            {team.players.length > 0 ? (
                                <ul className="list-disc pl-4">
                                    {team.players.map(player => (
                                        <li key={player.id} className="text-sm">{player.name} - {player.role}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm">No players available</p>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex space-x-2">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Teamspg;
