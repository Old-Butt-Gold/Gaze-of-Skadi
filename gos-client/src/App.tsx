import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout.tsx";
import {DistributionPage} from "./pages/DistributionPage.tsx";
import {APP_ROUTES} from "./config/navigation";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {RecordsPage} from "./pages/RecordsPage.tsx";
import {ScenariosPage} from "./pages/ScenariosPage.tsx";

function App() {
    return (
        <Routes>
            <Route path={APP_ROUTES.HOME} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={APP_ROUTES.DISTRIBUTIONS} element={<DistributionPage />} />
                <Route path={APP_ROUTES.RECORDS} element={<RecordsPage />} />
                <Route path={APP_ROUTES.SCENARIOS} element={<ScenariosPage />} />

                {/* Placeholders for the new links (Matches & Heroes).
                   These currently point to 404 until you build the actual pages.
                   Or you can create a temporary "Under Construction" component.
                */}
                <Route path="matches/:matchId" element={<NotFoundPage />} />
                <Route path="heroes/:heroId" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
