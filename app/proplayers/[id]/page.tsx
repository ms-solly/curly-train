"use client";

import React, { useState, useEffect } from 'react';
import config from '@/src/config';
import action from '@/src/actions/action';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const getPlayerData = async (accountId: string) =>
  action('players', config.API_HOST, `api/players/${accountId}`);

const getRecentMatches = async (accountId: string) =>
  action('recentMatches', config.API_HOST, `api/players/${accountId}/recentMatches`);

const PlayerProfilePage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const accountId = params.id;

  const [playerData, setPlayerData] = useState<any>(null);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const playerResponse = await getPlayerData(accountId);
        const matchesResponse = await getRecentMatches(accountId);

        if ('payload' in playerResponse) {
          setPlayerData(playerResponse.payload);
        } else {
          console.error("Error fetching player data:", playerResponse.error);
        }

        if ('payload' in matchesResponse) {
          setRecentMatches(matchesResponse.payload);
        } else {
          console.error("Error fetching matches data:", matchesResponse.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
      {loading ? (
        <div className="animate-pulse">
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col justify-between">
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      ) : playerData ? (
        <div>
          <div className="flex items-start space-x-6 mb-6">
            <Image
              src={playerData.avatarfull}
              alt={playerData.personaname}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-3xl font-bold">{playerData.personaname}</h1>
              <p className="text-lg text-gray-700">Name: {playerData.name || 'Unknown'}</p>
              <p className="text-lg text-gray-700">Team: {playerData.team_name || 'No team'}</p>
              <p className="text-lg text-gray-700">Country: {playerData.loccountrycode || 'Unknown'}</p>
              <p className="text-lg text-gray-700">Last Login: {new Date(playerData.last_login).toLocaleDateString() || 'Never'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Matches</h2>
            <Table className="rounded-lg shadow-md bg-white/5 border border-gray-200">
              <TableHeader className='bg-black'>
                <TableRow className="text-green-300">
                  <TableHead className="px-3 py-2 text-left">Match ID</TableHead>
                  <TableHead className="px-3 py-2 text-left">Hero ID</TableHead>
                  <TableHead className="px-3 py-2 text-left">Duration (sec)</TableHead>
                  <TableHead className="px-3 py-2 text-left">Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMatches.length > 0 ? (
                  recentMatches.map((match: any) => (
                    <TableRow key={match.match_id} className="border-b border-gray-700">
                      <TableCell className="px-4 py-2">
                        <Link href={`/matches/${match.match_id}`} className="text-blue-600 hover:underline">
                          {match.match_id}
                        </Link>
                      </TableCell>
                      <TableCell className="px-4 py-2">{match.hero_id}</TableCell>
                      <TableCell className="px-4 py-2">{match.duration}</TableCell>
                      <TableCell className="px-4 py-2">
                        <Button className="bg-green-500 hover:bg-green-700 rounded-md px-3 h-8 hover:text-white">
                          <Link href={`/matches/${match.match_id}`}>View Match</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No recent matches found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div>Error loading player data.</div>
      )}
    </div>
  );
};

export default PlayerProfilePage;
