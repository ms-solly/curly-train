import axios, { AxiosError } from "axios";
export interface Hero {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    legs: number;
  }
  
  export interface TeamHero {
    hero_id: number;
    name: string;
    games_played: number;
    wins: number;
  }
  
  export interface HeroStats {
    id: number;
    name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    img: string;
    icon: string;
    base_health: number;
    base_health_regen: number;
    base_mana: number;
    base_mana_regen: number;
    base_armor: number;
    base_mr: number;
    base_attack_min: number;
    base_attack_max: number;
    base_str: number;
    base_agi: number;
    base_int: number;
    str_gain: number;
    agi_gain: number;
    int_gain: number;
    attack_range: number;
    projectile_speed: number;
    attack_rate: number;
    base_attack_time: number;
    attack_point: number;
    move_speed: number;
    turn_rate: number;
    cm_enabled: boolean;
    legs: number;
    day_vision: number;
    night_vision: number;
    localized_name: string;
    turbo_picks: number;
    turbo_wins: number;
    pro_ban: number;
    pro_win: number;
    pro_pick: number;

}

type FetchHeroStatsResponse =
  | { type: 'SUCCESS'; payload: HeroStats[] }
  | { type: 'ERROR'; error: string };

const fetchHeroStats = async (): Promise<FetchHeroStatsResponse> => {
  try {
    const response = await axios.get<HeroStats[]>('https://api.opendota.com/api/heroStats');
    return { type: 'SUCCESS', payload: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { type: 'ERROR', error: error.message };
    } else {
      return { type: 'ERROR', error: 'An unexpected error occurred' };
    }
  }
};
export default fetchHeroStats;