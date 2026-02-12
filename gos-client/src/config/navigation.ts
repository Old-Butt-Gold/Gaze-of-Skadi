export interface NavItem {
  name: string;
  path: string;
}

export const APP_ROUTES = {
  HOME: '/',
  DISTRIBUTIONS: '/distributions',
  RECORDS: '/records',
  SCENARIOS: '/scenarios',
  TEAMS: '/teams',
  HEROES: '/heroes',
  PLAYERS: '/players',
  MATCHES: '/matches',
  NEWS: '/news',
  SEARCH: '/search',
  COMBOS: 'combo',
  PUBMATCHES: 'public-matches',
  PROMATCHES: 'pro-matches',
  FINDPLAYERS: 'find-players',
  MATCHES_QUEUE: '/matches-queue',
  META: '/meta',
} as const;

export const MAIN_NAVIGATION: NavItem[] = [
  { name: 'Distributions', path: APP_ROUTES.DISTRIBUTIONS },
  { name: 'Records', path: APP_ROUTES.RECORDS },
  { name: 'Scenarios', path: APP_ROUTES.SCENARIOS },
  { name: 'Team', path: APP_ROUTES.TEAMS },
  { name: 'Heroes', path: APP_ROUTES.HEROES },
  { name: 'Matches', path: APP_ROUTES.MATCHES },
  { name: 'Search', path: APP_ROUTES.SEARCH },
  { name: 'News', path: APP_ROUTES.NEWS },
  { name: 'Match Queue', path: APP_ROUTES.MATCHES_QUEUE },
  { name: 'Meta', path: APP_ROUTES.META },
];
