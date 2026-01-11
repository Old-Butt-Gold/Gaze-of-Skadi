import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout.tsx";
import {DistributionPage} from "./pages/DistributionPage.tsx";
import {APP_ROUTES} from "./config/navigation";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";

function App() {
    return (
        <Routes>
            <Route path={APP_ROUTES.HOME} element={<Layout />}>
                {/* Главная страница */}
                <Route index element={<HomePage />} />

                {/* Страница рангов */}
                <Route path={APP_ROUTES.DISTRIBUTIONS} element={<DistributionPage />} />

                {/* Обработка 404:
                   Вместо редиректа (<Navigate replace />) мы показываем компонент NotFoundPage.
                   path="*" ловит любые пути, которые не совпали с вышеперечисленными.
                */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
