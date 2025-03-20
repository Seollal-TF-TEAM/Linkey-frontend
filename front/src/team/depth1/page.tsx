import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppShell,
    Center,
    Text,
    Group,
    Button,
    Title,
    SimpleGrid,
    Card,
    Drawer
} from '@mantine/core';

function TeamPage() {
    const [opened, { open, close }] = useDisclosure(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    return (
        <>
            {/* 새 팀 생성용 사이드 페이지 */}
            <Drawer
                opened={opened}
                onClose={close}
                position="right"
                title="Authentication"
                size="xl" >
                <Text> 흠 ㅋㅋ </Text>
            </Drawer>

            <AppShell
                padding="md"
                navbar={{ width: 220, breakpoint: 'sm' }}
                styles={(theme) => ({
                    main: {
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                    },
                })}
            >
                {/* Navbar 영역 */}
                <AppShell.Navbar p="md" style={{ backgroundColor: '#f3f3f3' }}>
                    {/* 로고 */}
                    <Text size="xl" weight="bold" mb="xl">
                        Lin-key
                    </Text>

                    {/* 메뉴 */}
                    <div style={{ marginBottom: 40 }}>
                        {['/dashboard', '/project', '/team'].map((path, index) => (
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
                        <Button variant="subtle" color="dark" fullWidth>
                            Log-out
                        </Button>
                    </div>
                </AppShell.Navbar>

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
                    <div style={{ position: 'absolute', top: 16, left: 250 }}>
                        <Title order={1} mb="lg">
                            Team
                        </Title>
                    </div>

                    <Center>
                        <SimpleGrid cols={3} spacing="lg">
                            {/* 새 프로젝트 생성용 카드 (+) */}
                            <Card
                                shadow="sm"
                                p="xl"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:'200px', top:'100px'}}
                            >
                                {/* 새 프로젝트 생성용 사이드 페이지 열기 */}
                                <Button variant="light" color="#545454" onClick={open}>+</Button>
                            </Card>

                            {/* 기존 프로젝트 카드 (5개 예시) */}
                            {[...Array(5)].map((_, index) => (
                                <Card shadow="sm" p="xl" key={index} style={{ height: '200px', top:'100px', width: '300px' }}>
                                    <Text weight="bold" mb="xs">
                                        Team name
                                    </Text>
                                    <Text size="sm" color="dimmed" mb="md">
                                        Team description
                                        <br />
                                        - test added djslak 2.5
                                    </Text>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </Center>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

export default TeamPage;
