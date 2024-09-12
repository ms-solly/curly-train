"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Switchbtn from "@/components/ui/switch";
import Link from "next/link";
import Pagination from "@/components/Pagination"; // Import the pagination component

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
  const [showCurrent, setShowCurrent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 10; // Define the number of items per page

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`https://api.opendota.com/api/leagues`);
        console.log("API Response:", response.data);

        const tournamentsData = response.data.map((league: any) => ({
          leagueid: league.leagueid,
          name: league.name,
          tier: league.tier,
          location: league.location || "N/A",
          start_date: league.start_date || "Not available",
          end_date: league.end_date || "Not available",
          prize: league.prize || "Not available",
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
      let filtered = tournaments.filter((tournament) =>
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (showCurrent) {
        filtered = filtered.filter((tournament) => {
          const endDate = tournament.end_date ? new Date(tournament.end_date) : null;
          return endDate && endDate >= new Date();
        });
      }

      setFilteredTournaments(filtered);
    };

    filterTournaments();
  }, [searchQuery, showCurrent, tournaments]);

  // Pagination logic
  const totalItems = filteredTournaments.length;
  const indexOfLastTournament = currentPage * itemsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - itemsPerPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleNext = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 bg-background min-h-screen">
      <div className="space-y-2 md:space-y-3 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Tournaments</h2>
        <p className="text-sm md:text-base text-white">Browse current and past tournaments.</p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by tournament name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <div className="flex items-center space-x-2">
          <Switchbtn
            checked={showCurrent}
            onChange={(e) => setShowCurrent(e.target.checked)}
          />
          <label htmlFor="show-current" className="text-sm text-gray-700">
            Show current tournaments
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="rounded-b-lg border">
          <TableHeader className="hover:bg-black bg-black">
            <TableRow className="hover:bg-black bg-black">
              <TableHead>Dates</TableHead>
              <TableHead>Tournament Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Prize</TableHead>
              <TableHead>Tier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : currentTournaments.length > 0 ? (
              currentTournaments.map((tournament) => (
                <TableRow key={tournament.leagueid} className="hover:bg-green-200 hover:text-gray-800">
                  <TableCell>
                    {tournament.start_date || "N/A"} - {tournament.end_date || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Link href={`/tournaments/${tournament.leagueid}`}>{tournament.name}</Link>
                  </TableCell>
                  <TableCell>{tournament.location}</TableCell>
                  <TableCell>{tournament.prize}</TableCell>
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

      {/* Pagination Component */}
      {!loading && filteredTournaments.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default TournamentPage;
