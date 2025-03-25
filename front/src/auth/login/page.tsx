import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';

const GitHubLoginPage: React.FC = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const backendUri = process.env.REACT_APP_BACKEND_URI;
    const baseUri = process.env.REACT_APP_BASE_URL;
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
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const githubUserId = sessionStorage.getItem('githubUserId');

        if (githubUserId) {
            axios
                .get(`${baseUri}/auth/github/exists/${githubUserId}`)
                .then((res) => {
                    if (res.data.exists) {
                        navigate('/project'); // 로그인 상태면 /project로
                    } else {
                        sessionStorage.removeItem('githubUserId'); // 유효하지 않으면 세션 정리
                    }
                })
                .catch((err) => {
                    console.error('Login Check Error:', err);
                    sessionStorage.removeItem('githubUserId');
                });
        }

        if (code) {
            axios
                .get(`${backendUri}?code=${code}`)
                .then((res) => {
                    const userId = res.data.user.githubUserId;
                    sessionStorage.setItem('githubUserId', userId);
                    navigate('/project');
                })
                .catch((err) => console.error('GitHub Login Error:', err));
        }
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