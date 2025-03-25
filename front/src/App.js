import './App.css';
import GitHubLoginPage from "./auth/login/page.tsx";
import ProjectPage from "./project/main/page.tsx";
import TeamPage from "./team/depth1/page.tsx";
import ProjectDetailPage from "./project/[projectId]/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SprintPage from "./sprint/[sprintId]/page.tsx";
import NotFoundPage from "./error/404Page.tsx";
import withAuth from './components/withAuth';

// 보호된 페이지에 withAuth 적용
const ProtectedMainPage = withAuth(MainPage);
const ProtectedProjectPage = withAuth(ProjectPage);
const ProtectedSprintPage = withAuth(SprintPage);
const ProtectedCreateTeamPage = withAuth(CreateTeamPage);
const ProtectedTeamDepth1Page = withAuth(TeamDepth1Page);
const ProtectedProjectDepth1Page = withAuth(ProjectDepth1Page);
const ProtectedProjectMainPage = withAuth(ProjectMainPage);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/" element={<GitHubLoginPage />} />

                {/* 보호된 페이지 */}
                <Route path="/main" element={<ProtectedMainPage />} />
                <Route path="/project/:projectId" element={<ProtectedProjectPage />} />
                <Route path="/sprint/:sprintId" element={<ProtectedSprintPage />} />
                <Route path="/team/create" element={<ProtectedCreateTeamPage />} />
                <Route path="/team/depth1" element={<ProtectedTeamDepth1Page />} />
                <Route path="/project/depth1" element={<ProtectedProjectDepth1Page />} />
                <Route path="/project" element={<ProtectedProjectMainPage />} />

                {/* 404 페이지 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
