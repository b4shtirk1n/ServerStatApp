export interface Server {
  onlinePlayers: number;
  maxPlayers: number;
  motd: string;
  isRunning: boolean;
  difficulty: string;
  dayTime: number;
  raining: boolean;
  thundering: boolean;
  tps: number;
}
