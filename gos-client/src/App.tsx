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
import {InProgressTab} from "./components/ui/InProgressTab.tsx";
import {SearchPlayersTab} from "./components/search/tabs/SearchPlayersTab.tsx";
import {SearchPublicMatchesTab} from "./components/search/tabs/SearchPublicMatchesTab.tsx";

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
                <Route path={`${APP_ROUTES.HEROES}/:heroId`} element={<HeroDetailsPage />} />
                <Route path={APP_ROUTES.NEWS} element={<NewsPage />} />

                <Route path={APP_ROUTES.SEARCH} element={<SearchPage />}>
                    <Route index element={<Navigate to={APP_ROUTES.COMBOS} replace />} />

                    <Route path={APP_ROUTES.COMBOS} element={<SearchCombosTab />} />
                    <Route path={APP_ROUTES.FINDPLAYERS} element={<SearchPlayersTab />} />
                    <Route path={APP_ROUTES.PUBMATCHES} element={<SearchPublicMatchesTab />} />
                    <Route path={APP_ROUTES.PROMATCHES} element={<InProgressTab title="Match Finder" description="Advanced match filtering (by duration, result, league) is coming soon." />} />
                </Route>

                <Route path="matches/:matchId" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
