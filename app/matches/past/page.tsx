"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CornerButton } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import Pagination from "@/components/Pagination";

// Define a skeleton placeholder component
const TableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow className="bg-black hover:bg-black">
        <TableHead className="w-6">Status</TableHead>
        <TableHead className="text-center">Team 1</TableHead>
        <TableHead className="border-l-0 border-r-0 w-fit text-center"><GiCrossedSwords /></TableHead>
        <TableHead className="text-center">Team 2</TableHead>
        <TableHead>Duration</TableHead>
        <TableHead>MMR</TableHead>
        <TableHead>Series</TableHead>
        <TableHead>Game Mode</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(20)].map((_, index) => (
        <TableRow key={index}>
          <TableCell><div className="h-6 w-24 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
          <TableCell><div className="h-6 w-32 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
          <TableCell className="border-r-0 border-l-0 h-6 w-32 bg-gray-600 rounded-md animate-pulse"></TableCell>
          <TableCell><div className="h-6 w-32 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
          <TableCell><div className="h-6 w-20 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
          <TableCell><div className="h-6 w-16 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
          <TableCell><div className="h-6 w-20 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
          <TableCell><div className="h-6 w-20 bg-gray-600 rounded-md animate-pulse"></div></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

interface Match {
  match_id: number;
  radiant_name: string | null;
  dire_name: string | null;
  radiant_logo: string | null;
  dire_logo: string | null;
  series_type: number;
  radiant_win: boolean;
  duration: number;
  avg_mmr: number | null;
  game_mode: number;
  start_time: number;
}

export default function PastMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [displayedMatches, setDisplayedMatches] = useState<Match[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of matches to display per page

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://api.opendota.com/api/proMatches");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMatches(data);
        setDisplayedMatches(data.slice(0, itemsPerPage)); // Initialize with the first set of matches
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [itemsPerPage]);

  // Filter matches based on search term
  useEffect(() => {
    const filtered = matches.filter((match) => {
      const radiantName = match.radiant_name?.toLowerCase() || "";
      const direName = match.dire_name?.toLowerCase() || "";
      const teamNames = `${radiantName} vs ${direName}`;
      const searchLower = searchTerm.toLowerCase();
      return teamNames.includes(searchLower) || match.match_id.toString().includes(searchLower);
    });
    setDisplayedMatches(filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); // Update displayed matches based on filter and pagination
  }, [searchTerm, matches, currentPage, itemsPerPage]);

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const seriesType = (type: number): string => {
    switch (type) {
      case 0:
        return "BO1";
      case 1:
        return "BO3";
      case 2:
        return "BO5";
      default:
        return "Unknown";
    }
  };

  const getMatchStatus = (match: Match): string => {
    if (match.radiant_win) return "Radiant Win";
    return "Dire Win";
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(matches.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto my-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Past Matches</CardTitle>
          <CornerButton href="/matches/live">Live Matches</CornerButton>
        </CardHeader>
        <CardContent>
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by team or match ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {loading ? (
            <TableSkeleton />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <Table>
                <TableHeader className="bg-black hover:bg-black">
                  <TableRow className="hover:bg-transparent bg-black hover:bg-black">
                    <TableHead>Status</TableHead>
                    <TableHead className="border-r-0 text-center">Team 1</TableHead>
                    <TableHead className="border-l-0 border-r-0 text-center"><GiCrossedSwords /></TableHead>
                    <TableHead className="border-l-0 text-center">Team 2</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>MMR</TableHead>
                    <TableHead>Series</TableHead>
                    <TableHead>Game Mode</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedMatches.map((match) => (
                    <TableRow key={match.match_id}>
                      <TableCell>
                        {match.radiant_win ? (
                          <Badge variant="win" className="text-center">
                            <FaCrown className="ml-1 inline-block mr-1 text-gray-500" /> Radiant 
                          </Badge>
                        ) : (
                          <Badge variant="loss" className="text-center mr-2">
                            <FaCrown className="ml-4 inline-block mr-1 text-gray-500 text-right" /> Dire 
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="border-r-0 flex items-center">
                        {match.radiant_logo ? (
                          <Image 
                            src={match.radiant_logo}
                            alt={match.radiant_name || "Radiant"}
                            width={30}
                            height={30}
                            className="inline-block"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">N/A</div>
                        )}
                        <span className="ml-2">{match.radiant_name || "Unknown"}</span>
                      </TableCell>
                      <TableCell className="border-r-0 border-l-0 text-center">vs</TableCell>
                      <TableCell className="border-l-0 flex items-center">
                        {match.dire_logo ? (
                          <Image
                            src={match.dire_logo}
                            alt={match.dire_name || "Dire"}
                            width={30}
                            height={30}
                            className="inline-block"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">N/A</div>
                        )}
                        <span className="ml-2">{match.dire_name || "Unknown"}</span>
                      </TableCell>
                      <TableCell>{formatDuration(match.duration)}</TableCell>
                      <TableCell>{match.avg_mmr || "Unknown"}</TableCell>
                      <TableCell>{seriesType(match.series_type)}</TableCell>
                      <TableCell>{match.game_mode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={matches.length}
                paginate={handlePageChange}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
