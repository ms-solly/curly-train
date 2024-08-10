export interface Player {
  tracked_until: string | null;
  solo_competitive_rank: string | null;
  competitive_rank: string | null;
  rank_tier: number | null;
  leaderboard_rank: number | null;
  mmr_estimate: MmrEstimate;
  profile: PlayerProfile;
}

export interface MmrEstimate {
  estimate: number;
}

export interface PlayerProfile {
  account_id: number;
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
  is_contributor: boolean;
  is_subscriber: boolean;
}
