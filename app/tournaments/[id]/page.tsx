"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; // Use useParams for route parameters
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";

interface Tournament {
  leagueid: number;
  name: string;
  tier: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  prize?: string;
}

interface Match {
  match_id: number;
  radiant_name: string;
  dire_name: string;
  radiant_score: number;
  dire_score: number;
  radiant_win: boolean;
  start_time: number;
}

interface Team {
  team_id: number;
  name: string;
  rating: number;
  wins: number;
  losses: number;
}

const TournamentProfile: React.FC = () => {
  const { id } = useParams(); // Use useParams to get route parameters
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return; // Return early if id is not available
    }

    const fetchTournamentData = async () => {
      try {
        const leagueResponse = await axios.get(`https://api.opendota.com/api/leagues/${id}`);
        const matchesResponse = await axios.get(`https://api.opendota.com/api/leagues/${id}/matches`);
        const teamsResponse = await axios.get(`https://api.opendota.com/api/leagues/${id}/teams`);

        setTournament({
          leagueid: leagueResponse.data.leagueid,
          name: leagueResponse.data.name,
          tier: leagueResponse.data.tier,
          location: leagueResponse.data.location || "N/A",
          start_date: leagueResponse.data.start_date || "Not available",
          end_date: leagueResponse.data.end_date || "Not available",
          prize: leagueResponse.data.prize || "Not available"
        });

        setMatches(matchesResponse.data.map((match: any) => ({
          match_id: match.match_id,
          radiant_name: match.radiant_name,
          dire_name: match.dire_name,
          radiant_score: match.radiant_score,
          dire_score: match.dire_score,
          radiant_win: match.radiant_win,
          start_time: match.start_time
        })));

        setTeams(teamsResponse.data.map((team: any) => ({
          team_id: team.team_id,
          name: team.name,
          rating: team.rating,
          wins: team.wins,
          losses: team.losses
        })));
      } catch (error) {
        console.error("Failed to fetch tournament data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, [id]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      {loading ? (
        <p>Loading tournament details...</p>
      ) : (
        <div>
          {tournament && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{tournament.name}</h2>
              <p className="text-sm md:text-base text-white">Tier: {tournament.tier}</p>
              <p className="text-sm md:text-base text-white">Location: {tournament.location}</p>
              <p className="text-sm md:text-base text-white">Dates: {tournament.start_date} - {tournament.end_date}</p>
              <p className="text-sm md:text-base text-white">Prize: {tournament.prize}</p>
            </>
          )}

          <div className="mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Matches</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match ID</TableHead>
                    <TableHead>Radiant Team</TableHead>
                    <TableHead>Dire Team</TableHead>
                    <TableHead>Radiant Score</TableHead>
                    <TableHead>Dire Score</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Start Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.length > 0 ? (
                    matches.map(match => (
                      <TableRow key={match.match_id}>
                        <TableCell>{match.match_id}</TableCell>
                        <TableCell>{match.radiant_name}</TableCell>
                        <TableCell>{match.dire_name}</TableCell>
                        <TableCell>{match.radiant_score}</TableCell>
                        <TableCell>{match.dire_score}</TableCell>
                        <TableCell>{match.radiant_win ? 'Radiant' : 'Dire'} Win</TableCell>
                        <TableCell>{new Date(match.start_time * 1000).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No matches found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Teams</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Wins</TableHead>
                    <TableHead>Losses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.length > 0 ? (
                    teams.map(team => (
                      <TableRow key={team.team_id}>
                        <TableCell>
                          <Link href={`/teams/${team.team_id}`}>{team.name}</Link>
                        </TableCell>
                        <TableCell>{team.rating}</TableCell>
                        <TableCell>{team.wins}</TableCell>
                        <TableCell>{team.losses}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No teams found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentProfile;
