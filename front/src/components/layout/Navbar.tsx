import React from 'react';
import { AppShell, Text, Group, Button } from '@mantine/core';
import {useLocation, useNavigate} from "react-router-dom";

const NavbarComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

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
                            MK
                        </Button>
                        <div>
                            <Text weight="bold">Markwi</Text>
                            <Text size="xs" color="dimmed">
                                mk1.com@soria
                            </Text>
                        </div>
                    </Group>
                    <Button variant="subtle" color="dark" onClick={() => {console.log('clicked')}} fullWidth>
                        Log-out
                    </Button>
                </div>
            </AppShell.Navbar>
        </>
    );
};

export default NavbarComponent;
