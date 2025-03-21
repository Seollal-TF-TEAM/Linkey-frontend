import React, { useEffect } from 'react';
import axios from 'axios';
import {Button} from "@mantine/core";

const GitHubLoginPage: React.FC = () => {
    // GitHub OAuth 설정
    const clientId = 'Ov23liQoOCN40W8vsEU0'; // GitHub에서 발급받은 Client ID
    const redirectUri = 'http://localhost:3000/callback'; // 리디렉션될 URL (프론트엔드)
    const backendUri = 'http://localhost:8080/auth/github/callback'; // 백엔드 API
    const scope = 'read:user user:email';
    const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';

    // GitHub 로그인 버튼 클릭 핸들러
    const handleLogin = () => {
        const url = `${githubAuthorizeUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${encodeURIComponent(scope)}`;
        window.location.href = url;
    };

    // GitHub에서 받은 'code'를 백엔드로 보내기
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code'); // GitHub OAuth에서 전달된 'code' 추출

        if (code) {
            console.log('GitHub OAuth Code:', code);

            axios
                .get(`${backendUri}?code=${code}`)
                .then((res) => {
                    console.log('User Data:', res.data);
                    // JWT 토큰을 localStorage에 저장 (세션 유지)
                    localStorage.setItem('token', res.data.token);
                    window.location.href = '/'; // 로그인 후 홈으로 이동
                })
                .catch((err) => console.error('GitHub Login Error:', err));
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>GitHub OAuth 로그인</h1>
            <Button
                variant="light" color="#545454"
                onClick={handleLogin}
            >
                GitHub으로 로그인
            </Button>
        </div>
    );
};

export default GitHubLoginPage;