export interface Player {
    account_id: number;
    name: string;
    solo_competitive_rank: number;
    competitive_rank: number;
    mmr_estimate: MmrEstimate;
    profile: PlayerProfile;
  }
  
  export interface MmrEstimate {
    estimate: number;
  }
  
  export interface PlayerProfile {
    account_id: number;
    personaname: string;
    name: string;
    plus: boolean;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string;
    loccountrycode: string;
  }
  