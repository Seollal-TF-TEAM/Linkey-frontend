import React, { useState, useEffect } from 'react';
import { AppShell, Text, Group, Button } from '@mantine/core';
import {useLocation, useNavigate} from "react-router-dom";
import axios from 'axios'

const NavbarComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const baseUri = process.env.REACT_APP_BASE_URL;
    const githubUserId = sessionStorage.getItem('githubUserId');

    const [userInfo, setUserInfo] = useState({ name: '', email: '' });  // userInfo 상태 관리

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    const handleLogout = () => {
        try {
            axios.delete(`${baseUri}/auth/github/logout/${githubUserId}`)
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            sessionStorage.clear();
            navigate('/');
        }
    };

    const getUserInfo = async () => {

        try {
            if (githubUserId) {
                const response = await axios.get(`${baseUri}/user?githubUserId=${githubUserId}`);
                setUserInfo({
                    name: response.data.githubUserName,
                    email: response.data.githubProfileUrl,
                });
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [githubUserId]);

    return (
        <>
            {/* Navbar 영역 */}
            <AppShell.Navbar p="md" style={{ backgroundColor: '#f3f3f3' }}>
                {/* 로고 */}
                <Text size="xl" weight="bold" mb="xl">
                    Lin-key
                </Text>

                {/* 메뉴 */}
                <div style={{ marginBottom: 40 }}>
                    {['/project', '/team'].map((path, index) => (
                        <Button
                            key={index}
                            variant="subtle"
                            color="dark"
                            fullWidth
                            onClick={() => handleNavigation(path)}
                            style={{
                                justifyContent: 'flex-start',
                                fontWeight: location.pathname === path ? 'bold' : 'normal',
                                textDecoration: location.pathname === path ? 'underline' : 'none',
                                marginBottom: 16,
                            }}
                        >
                            {path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
                        </Button>
                    ))}
                </div>

                {/* 하단 프로필 & 로그아웃 버튼 */}
                <div style={{ marginTop: 'auto' }}>
                    <Group spacing="sm" mb="md">
                        <Button
                            variant="filled"
                            radius="xl"
                            style={{ width: 40, height: 40, padding: 0 }}
                        >
                            {userInfo.name.charAt(0)}
                        </Button>
                        <div>
                            <Text weight="bold">{userInfo.name}</Text>
                            <Text size="xs" color="dimmed">
                                {userInfo.email}
                            </Text>
                        </div>
                    </Group>
                    <Button variant="subtle" color="dark" onClick={handleLogout} fullWidth>
                        Log-out
                    </Button>
                </div>
            </AppShell.Navbar>
        </>
    );
};

export default NavbarComponent;
