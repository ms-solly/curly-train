import { Match } from '@/types/match';
import { Player } from '@/types/player';
import { Team } from '@/types/team';
import { Hero } from '@/types/hero';

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch('https://api.opendota.com/api/matches');
  const data = await response.json();
  return data as Match[];
}

export async function fetchPlayer(playerId: number): Promise<Player> {
  const response = await fetch(`https://api.opendota.com/api/players/${playerId}`);
  const data = await response.json();
  return data as Player;
}

export async function fetchTeams(): Promise<Team[]> {
  const response = await fetch('https://api.opendota.com/api/teams');
  const data = await response.json();
  return data as Team[];
}

export async function fetchHeroes(): Promise<Hero[]> {
  const response = await fetch('https://api.opendota.com/api/heroes');
  const data = await response.json();
  return data as Hero[];
}
