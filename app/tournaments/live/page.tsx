"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Switchbtn from "@/components/ui/switch";

interface Tournament {
  leagueid: number;
  name: string;
  tier: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  prize?: string;
}

const TournamentPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCurrent, setShowCurrent] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('https://api.opendota.com/api/leagues');
        console.log("API Response:", response.data);

        const tournamentsData = response.data.map((league: any) => ({
          leagueid: league.leagueid,
          name: league.name,
          tier: league.tier,
          location: "N/A", // Placeholder
          start_date: "Not available", // Placeholder
          end_date: "Not available", // Placeholder
          prize: "Not available" // Placeholder
        }));

        setTournaments(tournamentsData);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    const filterTournaments = () => {
      let filtered = tournaments.filter(tournament =>
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (showCurrent) {
        // Remove date filter for debugging
        // Uncomment the line below if date filtering is needed and you have date fields
        // filtered = filtered.filter(tournament => tournament.end_date !== "Not available" && new Date(tournament.end_date) >= new Date());
      }

      setFilteredTournaments(filtered.slice(0, 10)); // Limit to 10 tournaments
    };

    filterTournaments();
  }, [searchQuery, showCurrent, tournaments]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="space-y-2 md:space-y-3 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Tournaments
        </h2>
        <p className="text-sm md:text-base">
          Browse current and past tournaments.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <Input
          type="text"
          placeholder="Search by tournament name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64"
        />
        <div className="flex items-center space-x-2">
          <Switchbtn
            checked={showCurrent}
            onChange={(e) => setShowCurrent(e.target.checked)}
          />
          <label htmlFor="show-current" className="text-sm">
            Show current tournaments
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow  className='hover:bg-transparent'>
              <TableHead>Dates</TableHead>
              <TableHead>Tournament Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Prize</TableHead>
              <TableHead>Tier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading tournaments...
                </TableCell>
              </TableRow>
            ) : filteredTournaments.length > 0 ? (
              filteredTournaments.map(tournament => (
                <TableRow key={tournament.leagueid}>
                  <TableCell>
                    {tournament.start_date || "N/A"} - {tournament.end_date || "N/A"}
                  </TableCell>
                  <TableCell>{tournament.name}</TableCell>
                  <TableCell>{tournament.location || "N/A"}</TableCell>
                  <TableCell>{tournament.prize || "Not available"}</TableCell>
                  <TableCell>{tournament.tier}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tournaments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TournamentPage;
