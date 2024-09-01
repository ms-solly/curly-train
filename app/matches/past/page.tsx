"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Define a skeleton placeholder component
const TableSkeleton = () => (
  <Table className='border-separate border border-slate-500'>
    <TableHeader className="border border-slate-600" >
      <TableRow className="border border-slate-600" >
        <TableHead>Status</TableHead>
        <TableHead>Teams</TableHead>
        <TableHead>Duration</TableHead>
        <TableHead>MMR</TableHead>
        <TableHead>Series</TableHead>
        <TableHead>Game Mode</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(20)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="animate-pulse bg-gray-200 h-6 border border-slate-600"></TableCell>
          <TableCell className="animate-pulse bg-gray-200 h-6 w-32 border border-slate-600"></TableCell>
          <TableCell className="animate-pulse bg-gray-200 h-6 w-16 border border-slate-600"></TableCell>
          <TableCell className="animate-pulse bg-gray-200 h-6 w-12 border border-slate-600"></TableCell>
          <TableCell className="animate-pulse bg-gray-200 h-6 w-12 border border-slate-600"></TableCell>
          <TableCell className="animate-pulse bg-gray-200 h-6 w-12 border border-slate-600"></TableCell>
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
  const [itemsToShow, setItemsToShow] = useState(20); // Number of matches to display initially

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://api.opendota.com/api/proMatches");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMatches(data);
        setDisplayedMatches(data.slice(0, itemsToShow)); // Initialize with the first set of matches
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [itemsToShow]);

  // Filter matches based on search term
  useEffect(() => {
    const filtered = matches.filter((match) => {
      const radiantName = match.radiant_name?.toLowerCase() || "";
      const direName = match.dire_name?.toLowerCase() || "";
      const teamNames = `${radiantName} vs ${direName}`;
      const searchLower = searchTerm.toLowerCase();
      return teamNames.includes(searchLower) || match.match_id.toString().includes(searchLower);
    });
    setDisplayedMatches(filtered.slice(0, itemsToShow)); // Update displayed matches based on filter
  }, [searchTerm, matches, itemsToShow]);

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

  const loadMoreMatches = () => {
    setItemsToShow(itemsToShow + 10); // Show 10 more matches
  };

  return (
    <div className="container mx-auto my-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Past Matches</CardTitle>
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
              <Table className="border-separate border border-slate-500">
                <TableHeader className="border border-slate-600" >
                  <TableRow className="border border-slate-600" >
                    <TableHead className="border border-slate-600" >Status</TableHead>
                    <TableHead className="border border-slate-600" >Teams</TableHead>
                    <TableHead className="border border-slate-600" >Duration</TableHead>
                    <TableHead className="border border-slate-600" >MMR</TableHead>
                    <TableHead className="border border-slate-600" >Series</TableHead>
                    <TableHead className="border border-slate-600" >Game Mode</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border border-slate-600" >
                  {displayedMatches.map((match) => (
                    <TableRow key={match.match_id} className="border border-slate-600" >
                      <TableCell className="border border-slate-600" >
                        <Badge variant="outline">
                          {getMatchStatus(match)}
                        </Badge>
                      </TableCell>
                      <TableCell className="border border-slate-600" >
                        <div className="flex items-center gap-2">
                          {match.radiant_logo && (
                            <Image 
                              src={match.radiant_logo}
                              alt={match.radiant_name || "Radiant"}
                              width={26}
                              height={26}
                              className="rounded-full"
                            />
                          )}
                          <span>{match.radiant_name || "Unknown"}</span>
                          <span className="mx-2">vs</span>
                          {match.dire_logo && (
                            <Image
                              src={match.dire_logo}
                              alt={match.dire_name || "Dire"}
                              width={26}
                              height={26}
                              className="rounded-full"
                            />
                          )}
                          <span>{match.dire_name || "Unknown"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border border-slate-600" >{formatDuration(match.duration)}</TableCell>
                      <TableCell className="border border-slate-600" >{match.avg_mmr || "Unknown"}</TableCell>
                      <TableCell className="border border-slate-600" >{seriesType(match.series_type)}</TableCell>
                      <TableCell className="border border-slate-600" >{match.game_mode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {displayedMatches.length < matches.length && (
                <div className="mt-4 text-center">
                  <button
                    onClick={loadMoreMatches}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    View More
                  </button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
