import { Player } from "./player";
import { MatchData } from "./match";
import { TeamHero } from "./hero";
export interface Team {
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
    matches: MatchData[]; 
    heroes: TeamHero[]; 
}