"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Team } from "@/types/team";
import { Player } from "@/types/player";
import { TeamHero } from "@/types/hero";
import { MatchData } from "@/types/match";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import Pagination from "@/components/Pagination";

const fetchPlayers = async (team_id: number): Promise<Player[]> => {
  try {
    const response = await fetch(`https://api.opendota.com/api/teams/${team_id}/players`);
    if (!response.ok) {
      throw new Error(`Error fetching players for team ${team_id}`);
    }
    const playersData = await response.json();
    return playersData.map((player: any) => ({
      id: player.account_id,
      name: player.name || "Unknown Player",
      role: "Unknown Role", // Adjust this if you have role data available
      tracked_until: null,
      solo_competitive_rank: null,
      competitive_rank: null,
      rank_tier: null,
      leaderboard_rank: null,
      mmr_estimate: { estimate: 0 }, // Placeholder
      profile: {
        id: player.account_id,
        personaname: player.name || "Unknown Player",
        name: player.name || null,
        plus: false,
        cheese: 0,
        steamid: "", // Placeholder
        avatar: "", // Placeholder
        avatarmedium: "", // Placeholder
        avatarfull: "", // Placeholder
        profileurl: "", // Placeholder
        last_login: null,
        loccountrycode: null,
        is_contributor: false,
        is_subscriber: false,
      },
      avatar: "", // Placeholder
      team_name: "", // Placeholder
    }));
  } catch (error) {
    console.error("Error fetching players data:", error);
    return [];
  }
};

const fetchTeamMatches = async (team_id: number): Promise<MatchData[]> => {
  try {
    const response = await fetch(`https://api.opendota.com/api/teams/${team_id}/matches`);
    if (!response.ok) {
      throw new Error(`Error fetching matches for team ${team_id}`);
    }
    const matchesData = await response.json();
    return matchesData.map((match: any): MatchData => ({
      match_id: match.match_id,
      hero_id: match.hero_id || 0, // Placeholder if hero_id is needed
      duration: match.duration || 0,
    }));
  } catch (error) {
    console.error("Error fetching matches data:", error);
    return [];
  }
};

const fetchTeamHeroes = async (team_id: number): Promise<TeamHero[]> => {
  try {
    const response = await fetch(`https://api.opendota.com/api/teams/${team_id}/heroes`);
    if (!response.ok) {
      throw new Error(`Error fetching heroes for team ${team_id}`);
    }
    const heroesData = await response.json();
    return heroesData.map((hero: any): TeamHero => ({
      hero_id: hero.hero_id,
      name: hero.name || "Unknown Hero",
      games_played: hero.games_played || 0,
      wins: hero.wins || 0,
    }));
  } catch (error) {
    console.error("Error fetching heroes data:", error);
    return [];
  }
};

const fetchTeamsData = async (): Promise<Team[]> => {
  try {
    const response = await fetch("https://api.opendota.com/api/teams");
    if (response.status === 429) {
      console.error("Rate limited by the API. Please wait and try again.");
      return [];
    }
    const data = await response.json();
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
          heroes: heroes.slice(0, 5), // Limit to 5 heroes
        };
      })
    );

    return teams;
  } catch (error) {
    console.error("Error fetching teams data:", error);
    return [];
  }
};

const LoadingSkeleton = () => (
  <TableBody>
    {Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index} className="border-b border-gray-200 animate-pulse">
        <TableCell className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </TableCell>
        <TableCell className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </TableCell>
        <TableCell className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </TableCell>
        <TableCell className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </TableCell>
        <TableCell className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </TableCell>
        <TableCell className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

const ErrorMessage = () => (
  <div className="text-red-500 text-center py-4">
    <p>Error loading teams data. Please try again later.</p>
  </div>
);

const TeamsTable: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false); 
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of teams per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const teamsData = await fetchTeamsData();
        if (teamsData.length === 0) {
          throw new Error("No teams found");
        }
        setTeams(teamsData);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const indexOfLastTeam = currentPage * itemsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - itemsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleNext = () => {
    if (currentPage < Math.ceil(teams.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const teamsData = await fetchTeamsData();
        if (teamsData.length === 0) {
          throw new Error("No teams found");
        }
        setTeams(teamsData);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Table className="min-w-full border rounded-lg overflow-hidden shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 text-left">Team</TableHead>
            <TableHead className="px-6 py-3 text-left">Win Rate</TableHead>
            <TableHead className="px-6 py-3 text-left">Players</TableHead>
            <TableHead className="px-6 py-3 text-left">Matches</TableHead>
            <TableHead className="px-6 py-3 text-left">Heroes</TableHead>
            <TableHead className="px-6 py-3 text-left">Last Match</TableHead>
          </TableRow>
        </TableHeader>
        <LoadingSkeleton />
      </Table>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorMessage />
      </div>
    );
  }

  return (
    <div>
    <Table className="min-w-full border rounded-lg overflow-hidden shadow-md">
      <TableHeader>
        <TableRow>
          <TableHead className="px-6 py-3 text-left">Team</TableHead>
          <TableHead className="px-6 py-3 text-left">Win Rate</TableHead>
          <TableHead className="px-6 py-3 text-left">Players</TableHead>
          <TableHead className="px-6 py-3 text-left">Matches</TableHead>
          <TableHead className="px-6 py-3 text-left">Heroes</TableHead>
          <TableHead className="px-6 py-3 text-left">Last Match</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-gray-800">
        {teams.map((team) => (
          <TableRow key={team.team_id} className="border-b border-gray-200">
            <TableCell className="px-6 py-4 flex items-center space-x-4">
              <Image
                src={team.logo}
                alt={`${team.name} logo`}
                width={40}
                height={40}
                className="w-16 h-16 object-cover rounded-full border border-gray-300"
                quality={100}
              />
              <span className="font-semibold">{team.name}</span>
            </TableCell>
            <TableCell className="px-6 py-4">{team.win_rate.toFixed(2)}%</TableCell>
            <TableCell className="px-6 py-4">
              {team.players.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {team.players.map((player) => (
                    <div key={player.id} className="text-sm flex items-center space-x-2">
                      <Image
                        src={player.profile.avatar || "/download.png"}
                        alt={`${player.name} avatar`}
                        width={30}
                        height={30}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <span>{player.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm">No players available</p>
              )}
            </TableCell>
            <TableCell className="px-6 py-4">
              {team.matches.length > 0 ? team.matches.length : "No matches"}
            </TableCell>
            <TableCell className="px-6 py-4">
              {team.heroes.length > 0 ? team.heroes.length : "No heroes"}
            </TableCell>
            <TableCell className="px-6 py-4">
              {team.last_match_time ? (
                <p className="text-sm">
                  {new Date(team.last_match_time * 1000).toLocaleString()}
                </p>
              ) : (
                <p className="text-sm">No match data</p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {!loading && teams.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={teams.length}
          paginate={paginate}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default TeamsTable;
