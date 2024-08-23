import { Player } from "./player";
export interface Team {
    id: number;
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