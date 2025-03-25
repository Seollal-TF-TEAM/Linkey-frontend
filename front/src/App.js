import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GitHubLoginPage from './auth/login/page.tsx';
import NotFoundPage from './error/404Page.tsx';
import withAuth from './components/withAuth.tsx';

// 페이지 컴포넌트 임포트
import MainPage from './main/page.tsx';
import ProjectMainPage from './project/main/page.tsx';
import ProjectDepth1Page from './project/depth1/page.tsx';
import ProjectDetailPage from './project/[projectId]/page.tsx';
import SprintPage from './sprint/[sprintId]/page.tsx';
import CreateTeamPage from './team/createTeam/page.tsx';
import TeamDepth1Page from './team/depth1/page.tsx';

// 보호된 페이지에 withAuth 적용 (한 번에 정의)
const protectedRoutes = [
    { path: '/main', component: MainPage },
    { path: '/project', component: ProjectMainPage },
    { path: '/project/depth1', component: ProjectDepth1Page },
    { path: '/project/:projectId', component: ProjectDetailPage },
    { path: '/sprint/:sprintId', component: SprintPage },
    { path: '/team/create', component: CreateTeamPage },
    { path: '/team/depth1', component: TeamDepth1Page },
];

function App() {
    return (
        <BrowserRouter>
        <Routes>
            {/* 공개 경로 */}
            <Route path="/" element={<GitHubLoginPage />} />
            <Route path="/callback" element={<GitHubLoginPage />} />

            {/* 보호된 경로 그룹화 */}
            {protectedRoutes.map(({ path, component: Component }) => (
            <Route
                key={path}
                path={path}
                element={<ProtectedRoute component={Component} />}
            />
            ))}

            {/* 404 페이지 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </BrowserRouter>
    );
}

// 보호된 라우트를 위한 재사용 가능한 컴포넌트
const ProtectedRoute = ({ component: Component }) => {
    const ProtectedComponent = withAuth(Component);
    return <ProtectedComponent />;
};

export default App;