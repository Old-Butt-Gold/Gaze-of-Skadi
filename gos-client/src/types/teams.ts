export interface TeamDto {
  teamId: number;
  tag: string;
  name: string;
  lastMatchTime: number; // Unix timestamp
  losses: number;
  wins: number;
  rating: number;
  logoUrl: string | null;
}
