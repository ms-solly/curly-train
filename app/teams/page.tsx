"use client";

import React, { useState, useEffect } from "react";
import SearchTeamsInp from "@/components/teams/SearchTeams";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { Player } from "@/types/player";
import { Team } from "@/types/team";


// Fetch team players based on team ID
const fetchPlayers = async (team_id: number): Promise<Player[]> => {
    try {
        const response = await fetch(`https://api.opendota.com/api/teams/${team_id}/players`);
        if (!response.ok) {
            throw new Error(`Error fetching players for team ${team_id}`);
        }
        const playersData = await response.json();

        // Ensure the response is an array
        if (!Array.isArray(playersData)) return [];

        return playersData.map((player: any) => ({
            id: player.account_id,
            name: player.name || "Unknown Player",
            role: player.role || "Unknown Role",
        }));
    } catch (error) {
        console.error("Error fetching players data:", error);
        return [];
    }
};

// Fetch teams data and include player details
const fetchTeamsData = async (): Promise<Team[]> => {
    try {
        const cachedData = localStorage.getItem("teamsData");
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const response = await fetch("https://api.opendota.com/api/teams");
        if (response.status === 429) {
            console.error("Rate limited by the API. Please wait and try again.");
            return [];
        }

        const data = await response.json();

        // Ensure the response is an array
        if (!Array.isArray(data)) return [];

        const teams = await Promise.all(
            data.map(async (team: any) => {
                const players = await fetchPlayers(team.team_id);
                return {
                    id: team.team_id,
                    name: team.name || "Unknown Team",
                    logo: team.logo_url || "/download.png",
                    win_rate: team.rating || 0,
                    players: players.slice(0, 5), // Limit to 5 players
                };
            })
        );

        localStorage.setItem("teamsData", JSON.stringify(teams));

        return teams;
    } catch (error) {
        console.error("Error fetching teams data:", error);
        return [];
    }
};

const Teamspg: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

    useEffect(() => {
        const loadTeamsData = async () => {
            try {
                const data = await fetchTeamsData();
                setTeams(data);
                setFilteredTeams(data); // Initialize filtered teams with all teams
            } catch (error) {
                console.error("Error fetching teams data:", error);
            }
        };
        loadTeamsData();
    }, []);

    // Handle search input change
    useEffect(() => {
        const filtered = teams.filter(
            (team) =>
                team.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                team.id.toString().includes(searchInput)
        );
        setFilteredTeams(filtered);
        setCurrentPage(1); // Reset to the first page whenever search changes
    }, [searchInput, teams]);

    const indexOfLastTeam = currentPage * itemsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
    const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredTeams.length / itemsPerPage)));
    const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <SearchTeamsInp searchInput={searchInput} setSearchInput={setSearchInput} />
            <div className="p-4 rounded-lg shadow-lg">
                {/* <h1 className="text-4xl text-center font-bold mb-6">Teams</h1> */}
                <TeamsTable teams={currentTeams} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredTeams.length}
                    paginate={paginate}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    currentPage={currentPage}
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
        <table className="min-w-full border rounded-lg overflow-hidden shadow-md">
            <thead className="bg-sky-700 text-white">
                <tr>
                    <th className="px-6 py-3 text-left">Team</th>
                    <th className="px-6 py-3 text-left">Win Rate</th>
                    <th className="px-6 py-3 text-left">Players</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {teams.map((team) => (
                    <tr key={team.id} className="border-b border-gray-200">
                        <td className="px-6 py-4 flex items-center space-x-4">
                            <Image
                                src={team.logo}
                                alt={`${team.name} logo`}
                                width={40}
                                height={40}
                                className="w-16 h-16 object-cover rounded-full border border-gray-300"
                                quality={100}
                            />
                            <span className="font-semibold">{team.name}</span>
                        </td>
                        <td className="px-6 py-4">{team.win_rate || "N/A"}%</td>
                        <td className="px-6 py-4">
                            {team.players.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {team.players.map((player) => (
                                        <div key={player.id} className="text-sm flex items-center space-x-2">
                                            <Image
                                                src="/download.png"
                                                alt={`${player.name} avatar`}
                                                width={30}
                                                height={30}
                                                className="w-10 h-10 object-cover rounded-full"
                                            />
                                            <span>{player.name} - {player.role}</span>
                                        </div>
                                    ))}
                                </div>
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

export default Teamspg;
