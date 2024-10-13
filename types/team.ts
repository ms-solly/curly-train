export interface PlayerProfile {
    id: number;
    personaname: string;
    name: string | null;
    plus: boolean;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string | null;
    loccountrycode: string | null;
}

export interface Player {
    id: number;
    name: string;
    role: string;
    tracked_until: string | null;
    solo_competitive_rank: string | null;
    competitive_rank: string | null;
    rank_tier: number | null;
    leaderboard_rank: number | null;
    mmr_estimate: {
        estimate: number;
    };
    profile: PlayerProfile;
}

export interface Match {
    match_id: number;
    radiant: boolean;
    radiant_win: boolean;
    radiant_score: number;
    dire_score: number;
    duration: number;
    start_time: number;
    leagueid: number;
    league_name: string;
    opposing_team_id: number;
    opposing_team_name: string;
    opposing_team_logo: string;
}

export interface HeroStats {
    hero_id: number;
    name: string;
    games_played: number;
    wins: number;
}

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
    matches: Match[];
    heroes: HeroStats[];
}
