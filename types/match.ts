export interface Match {
    match_id: number;
    duration: number;
    start_time: number;
    radiant_team: string;
    dire_team: string;
    radiant_score: number;
    dire_score: number;
    radiant_win: boolean;
    players: PlayerStats[];
    radiant_name: string;
    dire_name: string;
    radiant_logo: string;
    dire_logo: string;
    series_type: number;
    avg_mmr: number | null;
    game_mode: number;
  }
  
  export interface PlayerStats {
    account_id: number;
    player_slot: number;
    hero_id: number;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    denies: number;
    gold_per_min: number;
    xp_per_min: number;
    level: number;
    hero_damage: number;
    tower_damage: number;
    hero_healing: number;
    items: number[];
  }
  

