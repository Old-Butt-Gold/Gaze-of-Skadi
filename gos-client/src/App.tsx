import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout.tsx";
import {DistributionPage} from "./pages/DistributionPage.tsx";
import {APP_ROUTES} from "./config/navigation";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {RecordsPage} from "./pages/RecordsPage.tsx";
import {ScenariosPage} from "./pages/ScenariosPage.tsx";
import {TeamsPage} from "./pages/TeamsPage.tsx";
import {TeamDetailsPage} from "./pages/TeamDetailsPage.tsx";
import {HeroStatsPage} from "./pages/HeroStatsPage.tsx";
import {HeroDetailsPage} from "./pages/HeroDetailsPage.tsx";
import {SearchCombosTab} from "./components/search/tabs/CombosMatchesTab.tsx";
import {NewsPage} from "./pages/NewsPage.tsx";
import {SearchPage} from "./pages/SearchPage.tsx";
import {SearchPlayersTab} from "./components/search/tabs/SearchPlayersTab.tsx";
import {SearchPublicMatchesTab} from "./components/search/tabs/SearchPublicMatchesTab.tsx";
import {SearchProMatchesTab} from "./components/search/tabs/SearchProMatchesTab.tsx";
import {PlayersQueuePage} from "./pages/PlayersQueuePage.tsx";
import {HeroesMetaPage} from "./pages/HeroesMetaPage.tsx";
import {MatchesTimelinePage} from "./pages/MatchesTimelinePage.tsx";
import {PlayerDetailsPage} from "./pages/PlayerDetailsPage.tsx";
import {PlayerStatsTab} from "./components/players/tabs/PlayerStatsTab.tsx";
import {PlayerWordCloudTab} from "./components/players/tabs/PlayerWordCloudTab.tsx";
import {PlayerHistogramsTab} from "./components/players/tabs/PlayerHistogramsTab.tsx";
import {PlayerHeroesTab} from "./components/players/tabs/PlayerHeroesTab.tsx";
import {PlayerWardMapTab} from "./components/players/tabs/PlayerWardMapTab.tsx";
import {PlayerPeersTab} from "./components/players/tabs/PlayerPeersTab.tsx";
import {PlayerProsTab} from "./components/players/tabs/PlayerProsTab.tsx";
import {PlayerCountsTab} from "./components/players/tabs/PlayerCountsTab.tsx";
import {PlayerRecordsTab} from "./components/players/tabs/PlayerRecordsTab.tsx";
import {PlayerActivityTab} from "./components/players/tabs/PlayerActivityTab.tsx";
import {PlayerMatchesTab} from "./components/players/tabs/PlayerMatchesTab.tsx";
import { HeroOverviewTab } from "./components/heroes/tabs/HeroOverviewTab.tsx";
import { HeroBenchmarksTab } from "./components/heroes/tabs/HeroBenchmarksTab.tsx";
import { HeroRankingsTab } from "./components/heroes/tabs/HeroRankingsTab.tsx";
import { HeroMatchupsTab } from "./components/heroes/tabs/HeroMatchupsTab.tsx";
import { HeroItemsTab } from "./components/heroes/tabs/HeroItemsTab.tsx";
import { HeroDurationsTab } from "./components/heroes/tabs/HeroDurationsTab.tsx";
import { HeroPlayersTab } from "./components/heroes/tabs/HeroPlayersTab.tsx";
import { HeroMatchesTab } from "./components/heroes/tabs/HeroMatchesTab.tsx";
import { HeroTrendsTab } from "./components/heroes/tabs/HeroTrendsTab.tsx";
import {MatchDetailsPage} from "./pages/MatchDetailsPage.tsx";
import {MatchChatTab} from "./components/matches/tabs/MatchChatTab.tsx";
import {MatchCosmeticsTab} from "./components/matches/tabs/MatchCosmeticsTab.tsx";
import {MatchActionsTab} from "./components/matches/tabs/MatchActionsTab.tsx";
import {MatchItemsTab} from "./components/matches/tabs/MatchItemsTab.tsx";

function App() {
    return (
        <Routes>
            <Route path={APP_ROUTES.HOME} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={APP_ROUTES.DISTRIBUTIONS} element={<DistributionPage />} />
                <Route path={APP_ROUTES.RECORDS} element={<RecordsPage />} />
                <Route path={APP_ROUTES.SCENARIOS} element={<ScenariosPage />} />
                <Route path={APP_ROUTES.TEAMS} element={<TeamsPage />} />
                <Route path={`${APP_ROUTES.TEAMS}/:teamId`} element={<TeamDetailsPage />} />
                <Route path={APP_ROUTES.HEROES} element={<HeroStatsPage />} />

                <Route path={`${APP_ROUTES.HEROES}/:heroId`} element={<HeroDetailsPage />}>
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<HeroOverviewTab />} />
                    <Route path="benchmarks" element={<HeroBenchmarksTab />} />
                    <Route path="rankings" element={<HeroRankingsTab />} />
                    <Route path="matches" element={<HeroMatchesTab />} />
                    <Route path="matchups" element={<HeroMatchupsTab />} />
                    <Route path="items" element={<HeroItemsTab />} />
                    <Route path="players" element={<HeroPlayersTab />} />
                    <Route path="durations" element={<HeroDurationsTab />} />
                    <Route path="trends" element={<HeroTrendsTab />} />
                </Route>

                <Route path={APP_ROUTES.NEWS} element={<NewsPage />} />
                <Route path={APP_ROUTES.MATCHES_QUEUE} element={<PlayersQueuePage />} />
                <Route path={APP_ROUTES.META} element={<HeroesMetaPage />} />
                <Route path={APP_ROUTES.MATCHES} element={<MatchesTimelinePage />} />

                <Route path={APP_ROUTES.SEARCH} element={<SearchPage />}>
                    <Route index element={<Navigate to={APP_ROUTES.COMBOS} replace />} />
                    <Route path={APP_ROUTES.COMBOS} element={<SearchCombosTab />} />
                    <Route path={APP_ROUTES.FINDPLAYERS} element={<SearchPlayersTab />} />
                    <Route path={APP_ROUTES.PUBMATCHES} element={<SearchPublicMatchesTab />} />
                    <Route path={APP_ROUTES.PROMATCHES} element={<SearchProMatchesTab />} />
                </Route>

                <Route path={`${APP_ROUTES.PLAYERS}/:playerId`} element={<PlayerDetailsPage />}>
                    <Route index element={<Navigate to="statistics" replace />} />
                    <Route path="statistics" element={<PlayerStatsTab />} />
                    <Route path="wordcloud" element={<PlayerWordCloudTab />} />
                    <Route path="histogram" element={<PlayerHistogramsTab />} />
                    <Route path="heroes" element={<PlayerHeroesTab />} />
                    <Route path="wardmap" element={<PlayerWardMapTab />} />
                    <Route path="peer" element={<PlayerPeersTab />} />
                    <Route path="pro" element={<PlayerProsTab />} />
                    <Route path="counts" element={<PlayerCountsTab />} />
                    <Route path="records" element={<PlayerRecordsTab />} />
                    <Route path="activity" element={<PlayerActivityTab />} />
                    <Route path="matches" element={<PlayerMatchesTab />} />
                </Route>

                <Route path={`${APP_ROUTES.MATCHES}/:matchId`} element={<MatchDetailsPage />}>
                    <Route index element={<Navigate to="chat" replace />} />

                    <Route path="chat" element={<MatchChatTab />} />
                    <Route path="cosmetics" element={<MatchCosmeticsTab />} />
                    <Route path="actions" element={<MatchActionsTab />} />
                    <Route path="items" element={<MatchItemsTab />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
