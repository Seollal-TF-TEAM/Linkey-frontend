import './App.css';
import GitHubLoginPage from "./auth/login/page.tsx";
import ProjectPage from "./project/main/page.tsx";
import TeamPage from "./team/depth1/page.tsx";
import ProjectDetailPage from "./project/[projectId]/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SprintPage from "./sprint/[sprintId]/page.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<GitHubLoginPage />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path="/project/:projectId" element={<ProjectDetailPage />} />
                <Route path="/project/:projectId/sprint/:sprintId" element={<SprintPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/callback" element={<GitHubLoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
