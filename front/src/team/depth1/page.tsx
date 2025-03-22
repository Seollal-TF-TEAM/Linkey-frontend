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
    Drawer, TextInput, Flex, MultiSelect
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
                        <Button variant="subtle" color="dark" fullWidth>
                            Log-out
                        </Button>
                    </div>
                </AppShell.Navbar>

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
                    <Center>
                        <div style={{ position: 'absolute', top: 16, left: 250 }}>
                            <Title order={1} mb="lg">
                                Team
                            </Title>
                        </div>

                        <SimpleGrid cols={3} spacing="lg" verticalSpacing="xs">
                            <Flex  ml={400} mt={140} w={600} direction="column">
                                {/* Team name */}
                                <Flex gap="md" align="flex-end" mb={30}>
                                    <TextInput
                                        size="md"
                                        label="Team Name"
                                        placeholder="Team Name"
                                        style={{ flex: 9 }}
                                    />
                                </Flex>

                                {/* select DB user for team members */}
                                <Flex gap="md" align="flex-end" mb={30}>
                                    <MultiSelect
                                        size="md"
                                        label="Select Team Members"
                                        placeholder="Choose your team members"
                                        style={{ flex: 9 }}
                                        data={['은정', '정현', '원호', '대연', '민지', '홍찬', '슬기']}
                                        searchable
                                    />
                                </Flex>
                                <Flex w={100} ml={500}>
                                    <Button
                                        variant="filled"
                                        color="#545454"
                                        size="md"
                                        style={{ flex: 1 }}
                                        mt={20}
                                    >
                                        Edit
                                    </Button>
                                </Flex>
                            </Flex>
                        </SimpleGrid>
                    </Center>



                    <Center>

                        {/*<div style={{ position: 'static', top: 16, left: 250 }}>*/}
                        {/*    <Title order={1} mb="lg">*/}
                        {/*        My Team*/}
                        {/*    </Title>*/}
                        {/*</div>*/}

                        <SimpleGrid cols={4} spacing="lg" verticalSpacing="xs" mt={70}>
                            {/* 새 팀 생성용 카드 (+) */}
                            <Card
                                shadow="sm"
                                p="xl"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:'200px', top:'100px'}}
                            >
                                {/* 새 프로젝트 생성용 사이드 페이지 열기 */}
                                <Button variant="transparent" color="#545454" size="xl" onClick={open}>+</Button>
                            </Card>

                            {/* 기존 팀 카드 (3개 예시) */}
                            {[...Array(3)].map((_, index) => (
                                <Card shadow="sm" p="xl" key={index} style={{ height: '200px', top:'100px', width: '200px' }}>
                                    <Text weight="bold" mb="xs">
                                        Team name
                                    </Text>
                                    <Text size="sm" color="dimmed" mb="md">
                                        Team description
                                    </Text>
                                    <Button variant="light" color="#545454" >Button</Button>
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
