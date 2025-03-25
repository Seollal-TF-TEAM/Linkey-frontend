import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';

const GitHubLoginPage: React.FC = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const backendUri = process.env.REACT_APP_BACKEND_URI;
    const scope = 'read:user user:email';
    const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
    const navigate = useNavigate();

    console.log(clientId, redirectUri, backendUri);

    const handleLogin = () => {
        const url = `${githubAuthorizeUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${encodeURIComponent(scope)}`;
        window.location.href = url;
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            console.log('GitHub OAuth Code:', code);
            axios
                .get(`${backendUri}?code=${code}`)
                .then((res) => {
                    console.log('User Data:', res.data);
                    localStorage.setItem('token', res.data.token);
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