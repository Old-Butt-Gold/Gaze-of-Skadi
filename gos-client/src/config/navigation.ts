export interface NavItem {
  name: string;
  path: string;
  icon?: string;
}

export const APP_ROUTES = {
  HOME: '/',
  DISTRIBUTIONS: '/distributions',
  RECORDS: '/records',
  SCENARIOS: '/scenarios',
  TEAMS: '/teams',
  HERO_STATS: '/hero-stats'
} as const;

export const MAIN_NAVIGATION: NavItem[] = [
  { name: 'Distributions', path: APP_ROUTES.DISTRIBUTIONS, icon: '/assets/images/medal_0.png' },
  { name: 'Records', path: APP_ROUTES.RECORDS },
  { name: 'Scenarios', path: APP_ROUTES.SCENARIOS },
  { name: 'Team', path: APP_ROUTES.TEAMS },
  { name: 'Heroes', path: APP_ROUTES.HERO_STATS }
];
