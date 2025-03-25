// src/components/withAuth.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const withAuth = (WrappedComponent: React.FC) => {
    const AuthComponent: React.FC = (props) => {
        const navigate = useNavigate();
        const githubUserId = sessionStorage.getItem('githubUserId');
        const baseUri = process.env.REACT_APP_BASE_URL;

        useEffect(() => {
            if (!githubUserId) {
                navigate('/'); // 로그인 안 되어 있으면 "/"로
                return;
            }

            axios
                .get(`${baseUri}/auth/github/exists/${githubUserId}`)
                .then((res) => {
                    if (!res.data.exists) {
                        sessionStorage.removeItem('githubUserId');
                        navigate('/'); // 유효하지 않으면 "/"로
                    }
                })
                .catch((err) => {
                    console.error('Auth Check Error:', err);
                    sessionStorage.removeItem('githubUserId');
                    navigate('/');
                });
        }, [navigate]);

        return githubUserId ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default withAuth;