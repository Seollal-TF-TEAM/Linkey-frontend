import React, { useState, useEffect } from 'react';
import { AppShell, Text, Group, Button, Card, Avatar } from '@mantine/core';
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
            <AppShell.Navbar p="md" style={{ backgroundColor: '#f3f3f3', width: '250px'  }}>
                {/* 로고 */}
                <Text size="30px" weight="500" mb="30">
                    Lin-key
                </Text>

                {/* 메뉴 */}
                <div style={{ marginBottom: 40 }}>
                    {['/project', '/team'].map((path, index) => (
                        <Button
                            key={index}
                            variant="transparent"
                            color="dark"
                            fullWidth
                            onClick={() => handleNavigation(path)}
                            size="lg"
                            style={{
                                justifyContent: 'flex-start',
                                fontWeight: location.pathname === path ? 'bold' : 'normal',
                                textDecoration: location.pathname === path ? 'underline' : 'none',
                                marginBottom: 16,
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            {path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
                        </Button>
                    ))}
                </div>

                {/* 하단 프로필 & 로그아웃 버튼 */}
                <div style={{ marginTop: 'auto' }}>
                    <Card shadow="sm" padding="lg" radius="md" style={{ backgroundColor: '#f9f9f9' }}>
                        <Group spacing="sm" mb="md" style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                size={50}
                                radius="50%"
                                style={{
                                    // backgroundColor: '#3b82f6',
                                    fontWeight: 'bold',
                                }}
                            >
                                {userInfo.name.charAt(0)}
                            </Avatar>
                            <div>
                                <Text weight="bold" style={{ fontSize: '1.2rem' }}>{userInfo.name}</Text>
                                <Text size="sm" color="dimmed">{userInfo.email}</Text>
                            </div>
                        </Group>
                        <Button
                            variant="transparent"
                            color="dark"
                            onClick={handleLogout}
                            h="50"
                            fullWidth
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                paddingTop: 12,
                                paddingBottom: 12,
                                borderRadius: '20px',
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Log out
                        </Button>
                    </Card>
                </div>
            </AppShell.Navbar>
        </>
    );
};

export default NavbarComponent;
