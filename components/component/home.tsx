"use client"
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Chat from "@/components/Chat";
import Image from 'next/image';
import Link from 'next/link';

interface Match {
  match_id: number;
  radiant_name: string;
  dire_name: string;
  radiant_logo: string;
  dire_logo: string;
  series_type: number;
  radiant_win: boolean;
  duration: number;
  avg_mmr: number | null;
  game_mode: number;
  start_time: number;
}

interface Player {
  account_id: number;
  name: string;
  team_name: string;
  avatar: string;
}

interface Tournament {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  prize_pool: string;
}

interface Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo: string;
  win_rate: number;
  players: Player[];
}

const fetchAndSortTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetch("https://api.opendota.com/api/teams");
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    if (!Array.isArray(data)) return [];

    // Process teams data without fetching player details
    const teams = data.map((team: any): Team => ({
      team_id: team.team_id,
      rating: team.rating || 0,
      wins: team.wins || 0,
      losses: team.losses || 0,
      last_match_time: team.last_match_time || 0,
      name: team.name || "Unknown Team",
      tag: team.tag || "N/A",
      logo: team.logo_url || "/download.png",
      win_rate: (team.wins / (team.wins + team.losses)) * 100 || 0, // Calculate win rate
      players: [], // Set players as an empty array
    }));

    // Sort teams by win rate in descending order
    teams.sort((a, b) => b.win_rate - a.win_rate);

    return teams.slice(0, 5); // Return top 5 teams
  } catch (error) {
    console.error("Error fetching and sorting teams data:", error);
    return [];
  }
};

export function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [topTeams, setTopTeams] = useState<Team[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingTopTeams, setLoadingTopTeams] = useState(true);
  const [errorMatches, setErrorMatches] = useState<string | null>(null);
  const [errorPlayers, setErrorPlayers] = useState<string | null>(null);
  const [errorTopTeams, setErrorTopTeams] = useState<string | null>(null);

  const demoTournaments: Tournament[] = [
    { id: 1, name: 'The International 2024', start_date: '2024-08-01', end_date: '2024-08-15', prize_pool: '$40,000,000' },
    { id: 2, name: 'ESL One Berlin 2024', start_date: '2024-09-10', end_date: '2024-09-20', prize_pool: '$1,000,000' },
    { id: 3, name: 'Dota 2 Major Championships 2024', start_date: '2024-10-05', end_date: '2024-10-15', prize_pool: '$500,000' },
  ];

  // Fetching top matches
  useEffect(() => {
    const fetchMatchDetails = async (match_id: number) => {
      try {
        const response = await fetch(`https://api.opendota.com/api/matches/${match_id}`);
        const data = await response.json();
        return {
          match_id: data.match_id,
          radiant_name: data.radiant_team?.name || 'Radiant',
          dire_name: data.dire_team?.name || 'Dire',
          radiant_logo: data.radiant_team?.logo_url || 'https://raw.githubusercontent.com/ms-solly/curly-train/64db1b64ea20490e23a08a571ca8424cdb6fceeb/public/images/teamLogo.png',
          dire_logo: data.dire_team?.logo_url || 'https://raw.githubusercontent.com/ms-solly/curly-train/64db1b64ea20490e23a08a571ca8424cdb6fceeb/public/images/teamLogo.png',
          series_type: data.series_type,
          radiant_win: data.radiant_win,
          duration: data.duration,
          avg_mmr: data.avg_mmr,
          game_mode: data.game_mode,
          start_time: data.start_time,
        };
      } catch (error) {
        console.error('Error fetching match details:', error);
        return null;
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await fetch('https://api.opendota.com/api/proMatches');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const matchDetailsPromises = data.slice(0, 7).map((match: any) => fetchMatchDetails(match.match_id));
        const detailedMatches = await Promise.all(matchDetailsPromises);
        setMatches(detailedMatches.filter(Boolean));
      } catch (error) {
        console.error('Error fetching matches:', error);
        setErrorMatches('Failed to fetch matches. Please try again later.');
      } finally {
        setLoadingMatches(false);
      }
    };

    fetchMatches();
  }, []);

  // Fetching top teams
  useEffect(() => {
    const fetchTopTeamsData = async () => {
      try {
        const teams = await fetchAndSortTeams();
        setTopTeams(teams);
      } catch (error) {
        console.error('Error fetching top teams:', error);
        setErrorTopTeams('Failed to fetch top teams. Please try again later.');
      } finally {
        setLoadingTopTeams(false);
      }
    };

    fetchTopTeamsData();
  }, []);

  // Fetching top players
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://api.opendota.com/api/proPlayers');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const topPlayers = data.slice(0, 5).map((player: any) => ({
          account_id: player.account_id,
          name: player.name,
          team_name: player.team_name,
          avatar: player.avatarfull || 'https://raw.githubusercontent.com/ms-solly/curly-train/64db1b64ea20490e23a08a571ca8424cdb6fceeb/public/images/teamLogo.png',
        }));
        setPlayers(topPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
        setErrorPlayers('Failed to fetch players. Please try again later.');
      } finally {
        setLoadingPlayers(false);
      }
    };

    fetchPlayers();
  }, []);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const seriesType = (type: number): string => {
    switch (type) {
      case 0:
        return 'BO1';
      case 1:
        return 'BO3';
      case 2:
        return 'BO5';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <main className="container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
        {/* Live Matches */}
        <section className="col-span-1 md:col-span-2 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Live Matches</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMatches ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-12 rounded-md bg-gray-700"></div>
                    </div>
                  ))}
                </div>
              ) : errorMatches ? (
                <div className="text-center text-red-500">{errorMatches}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead>Series</TableHead>
                      <TableHead>Game Mode</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.match_id}>
                        <TableCell>
                          {match.start_time * 1000 < Date.now() ? (
                            <Badge variant="outline">Live</Badge>
                          ) : (
                            <Badge variant="outline">Upcoming</Badge>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(match.start_time)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Image
                              src={match.radiant_logo}
                              alt={match.radiant_name}
                              width={26}
                              height={26}
                              className="rounded-full"
                            />
                            <span>{match.radiant_name}</span>
                            <span className="mx-2">vs</span>
                            <Image
                              src={match.dire_logo}
                              alt={match.dire_name}
                              width={26}
                              height={26}
                              className="rounded-full"
                            />
                            <span>{match.dire_name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{seriesType(match.series_type)}</TableCell>
                        <TableCell>{match.game_mode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Top Teams */}
        <section className="col-span-1 md:col-span-1 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Top Teams</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingTopTeams ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-12 rounded-md bg-gray-700"></div>
                    </div>
                  ))}
                </div>
              ) : errorTopTeams ? (
                <div className="text-center text-red-500">{errorTopTeams}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead>Team</TableHead>
                      <TableHead>Win Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topTeams.map((team) => (
                      <TableRow key={team.team_id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Image
                              src={team.logo}
                              alt={team.name}
                              width={26}
                              height={26}
                              className="rounded-full"
                            />
                            <span>{team.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{team.win_rate.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Top Players */}
        <section className="col-span-1 md:col-span-1 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Top Players</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingPlayers ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-12 rounded-md bg-gray-700"></div>
                    </div>
                  ))}
                </div>
              ) : errorPlayers ? (
                <div className="text-center text-red-500">{errorPlayers}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                      <TableHead>Player</TableHead>
                      <TableHead>Team</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.map((player) => (
                      <TableRow key={player.account_id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Image
                              src={player.avatar}
                              alt={player.name}
                              width={26}
                              height={26}
                              className="rounded-full"
                            />
                            <span>{player.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{player.team_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Tournaments */}
        <section className="col-span-1 md:col-span-1 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Top Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Prize Pool</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoTournaments.map((tournament) => (
                    <TableRow key={tournament.id}>
                      <TableCell>{tournament.name}</TableCell>
                      <TableCell>{tournament.start_date}</TableCell>
                      <TableCell>{tournament.end_date}</TableCell>
                      <TableCell>{tournament.prize_pool}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Chat Component */}
        <section className="col-span-1 md:col-span-2 lg:col-span-1 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <Chat />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Home;
