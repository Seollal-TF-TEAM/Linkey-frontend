import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import {checkGithubUserExists, getGithubUserIdByCode} from "../../api/rest/restApi.tsx";

const GitHubLoginPage: React.FC = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const backendUri = process.env.REACT_APP_BACKEND_URI;
    const scope = 'read:user user:email';
    const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
    const navigate = useNavigate();

    const handleLogin = () => {
        const url = `${githubAuthorizeUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${encodeURIComponent(scope)}`;
        window.location.href = url;
    };

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const githubUserId = sessionStorage.getItem('githubUserId');

            try {
                if (githubUserId) {
                    const res = await checkGithubUserExists(githubUserId);
                    if (res.data.exists) {
                        navigate('/project');
                        return;
                    } else {
                        sessionStorage.removeItem('githubUserId');
                    }
                }

                if (code) {
                    const res = await getGithubUserIdByCode(code);
                    const userId = res.data.user.githubUserId;
                    sessionStorage.setItem('githubUserId', userId);
                    navigate('/project');
                }
            } catch (err) {
                console.error('Login Flow Error:', err);
                sessionStorage.removeItem('githubUserId');
            }
        })(); // ✅ 즉시 실행 async 함수 (IIFE)
    }, [backendUri]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>GitHub OAuth 로그인</h1>
            <Button
                variant="light"
                color="#545454"
                onClick={handleLogin}
            >
                GitHub으로 로그인
            </Button>
        </div>
    );
};

export default GitHubLoginPage;