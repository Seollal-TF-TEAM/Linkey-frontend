import './App.css';
import GitHubLoginPage from "./auth/login/page.tsx";
import ProjectPage from "./project/depth1/page.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<GitHubLoginPage />} />
                <Route path="/project" element={<ProjectPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
