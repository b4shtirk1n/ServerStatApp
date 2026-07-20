export interface Server {
  name: string;
  version: string;
  online: number;
  maxPlayers: number;
  tps: number;
  mspt: number;
  motd: string;
  weather: {
    raining: boolean;
    thundering: boolean;
  };
  time: {
    day: number;
    dayTime: number;
  };
}
