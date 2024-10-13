"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Team, Player, Match, HeroStats } from "@/types/team";
import Pagination from "@/components/Pagination";
import SearchTeamsInp from "@/components/teams/SearchTeams";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Utility function for fetching with retry logic
const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else if (response.status === 429) {
                console.warn(`Rate limited. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
        }
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
};

// Fetch players for a team
const fetchPlayers = async (team_id: number): Promise<Player[]> => {
    try {
        return await fetchWithRetry(`https://api.opendota.com/api/teams/${team_id}/players`);
    } catch (error) {
        console.error("Error fetching players data:", error);
        return [];
    }
};

// Fetch matches for a team
const fetchTeamMatches = async (team_id: number): Promise<Match[]> => {
    try {
        return await fetchWithRetry(`https://api.opendota.com/api/teams/${team_id}/matches`);
    } catch (error) {
        console.error("Error fetching matches data:", error);
        return [];
    }
};

// Fetch heroes for a team
const fetchTeamHeroes = async (team_id: number): Promise<HeroStats[]> => {
    try {
        return await fetchWithRetry(`https://api.opendota.com/api/teams/${team_id}/heroes`);
    } catch (error) {
        console.error("Error fetching hero stats data:", error);
        return [];
    }
};

// Fetch teams data, including players, matches, and hero data
const fetchTeamsData = async (): Promise<Team[]> => {
    try {
        const response = await fetchWithRetry("https://api.opendota.com/api/teams");
        const data = await response;

        if (!Array.isArray(data)) return [];

        const teams = await Promise.all(
            data.map(async (team: any): Promise<Team> => {
                const players = await fetchPlayers(team.team_id);
                const matches = await fetchTeamMatches(team.team_id);
                const heroes = await fetchTeamHeroes(team.team_id);

                return {
                    team_id: team.team_id,
                    rating: team.rating || 0,
                    wins: team.wins || 0,
                    losses: team.losses || 0,
                    last_match_time: team.last_match_time || 0,
                    name: team.name || "Unknown Team",
                    tag: team.tag || "N/A",
                    logo: team.logo_url || "/download.png",
                    win_rate: team.rating || 0,
                    players: players.slice(0, 5), // Limit to 5 players
                    matches: matches.slice(0, 5), // Limit to 5 matches
                    heroes: heroes.slice(0, 5),  // Limit to 5 heroes
                };
            })
        );

        return teams;
    } catch (error) {
        console.error("Error fetching teams data:", error);
        return [];
    }
};

const TeamsPage: React.FC = () => {
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
                console.error("Error loading teams data:", error);
            }
        };

        loadTeamsData();
    }, []);

    // Handle search input change
    useEffect(() => {
        const filtered = teams.filter(
            (team) =>
                team.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                team.team_id.toString().includes(searchInput)
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
        <Table className="min-w-full border rounded-lg overflow-hidden shadow-md">
            <TableHeader>
                <TableRow>
                    <TableHead className="px-6 py-3 text-left">Team</TableHead>
                    <TableHead className="px-6 py-3 text-left">Win Rate</TableHead>
                    <TableHead className="px-6 py-3 text-left">Players</TableHead>
                    <TableHead className="px-6 py-3 text-left">Matches</TableHead>
                    <TableHead className="px-6 py-3 text-left">Heroes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teams.map((team) => (
                    <TableRow key={team.team_id} className="border-b">
                        <TableCell className="px-6 py-4 flex items-center space-x-4">
                            <Image
                                src={team.logo}
                                alt={`${team.name} logo`}
                                width={40}
                                height={40}
                                className="w-16 h-16 object-cover rounded-full"
                                quality={100}
                            />
                            <span>{team.name}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">{team.win_rate || "N/A"}%</TableCell>
                        <TableCell className="px-6 py-4">
                            {team.players.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {team.players.map((player) => (
                                        <div key={player.id} className="flex items-center space-x-2">
                                            <Image
                                                src={player.profile.avatar || "/download.png"}
                                                alt={player.profile.personaname || "Unknown"}
                                                width={30}
                                                height={30}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <span>{player.profile.personaname || "Unknown"}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No players available</p>
                            )}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                            {team.matches.length > 0 ? (
                                <ul>
                                    {team.matches.map((match) => (
                                        <li key={match.match_id}>
                                            {match.radiant_win ? "Win" : "Loss"} - {match.duration} secs
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No matches available</p>
                            )}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                            {team.heroes.length > 0 ? (
                                <ul>
                                    {team.heroes.map((hero) => (
                                        <li key={hero.hero_id}>
                                            {hero.name}: {hero.wins}/{hero.games_played} wins
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No heroes available</p>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TeamsPage;
