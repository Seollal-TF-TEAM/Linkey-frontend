import './App.css';
import GitHubLoginPage from './auth/login/page.tsx';
import ProjectMainPage from './project/main/page.tsx'; // ProjectPage 대신 명확히 ProjectMainPage로
import TeamDepth1Page from './team/depth1/page.tsx'; // TeamPage로 사용 가능
import ProjectDetailPage from './project/[projectId]/page.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SprintPage from './sprint/[sprintId]/page.tsx';
import NotFoundPage from './error/404Page.tsx';
import withAuth from './components/withAuth.tsx';
import MainPage from './main/page.tsx'; // 누락된 MainPage 임포트
import CreateTeamPage from './team/createTeam/page.tsx'; // 누락된 CreateTeamPage 임포트
import ProjectDepth1Page from './project/depth1/page.tsx'; // 누락된 ProjectDepth1Page 임포트

// 보호된 페이지에 withAuth 적용
const ProtectedMainPage = withAuth(MainPage);
const ProtectedProjectDetailPage = withAuth(ProjectDetailPage); // ProjectPage 대신 ProjectDetailPage
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
                <Route path="/project/:projectId" element={<ProtectedProjectDetailPage />} />
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