import React from 'react';
import { useState } from 'react';
import {AppShell, Badge, Box, Button, Card, Center, Flex, Group, SimpleGrid, Text, ThemeIcon, Title} from '@mantine/core';
import {useLocation, useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import TabsComponentPage from "./Components/TabsPage.tsx";
// @ts-ignore
import TodoComponent from "./Components/TodoPage.tsx";
// @ts-ignore
import SprintPreviewComponent from "./Components/SprintPreviewPage.tsx";
import {IconPlus} from '@tabler/icons-react';


function ProjectDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectId } = useParams();

    // Sprints sample data
    const sprints = [
        { id: 1, title: "Sprint #1", description: "Initial setup" },
        { id: 2, title: "Sprint #2", description: "Core features" }
    ];

    // navigate to sprint detail page
    const handleSprintClick = (sprintId) => {
        navigate(`/sprint/${sprints[0].id}`);
    };


    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };


    return (
        <>
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

                {/*<Navbar/>*/}
                 Navbar 영역
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
                    <Box p="md">
                        <Flex direction="column" gap="lg">
                            {/* project name */}
                            <Title order={1}>Project Name {projectId}</Title>

                            {/* project description */}
                            <Text>project description..</Text>

                            {/* project team members */}
                            <Group align="center" spacing="xs">
                                <Text>members :</Text>
                                {/* badge for team members */}
                                <Badge color="rgba(94, 94, 94, 1)" size="lg" radius="md">user01</Badge>
                                <Badge color="rgba(94, 94, 94, 1)" size="lg" radius="md">user02</Badge>
                            </Group>
                        </Flex>

                    </Box>

                    <Box p="md" mt={100}>
                        <Flex direction="column">
                            <Flex justify="space-between">
                                <Title>Sprint</Title>
                                <Flex align="center">
                                    <Text color="gray" size="lg">Add Sprint</Text>
                                    <Button size="sm" mr={100} variant="transparent" color="gray">
                                        <ThemeIcon color="#f6f7f9">
                                            <IconPlus color="gray"/>
                                        </ThemeIcon>
                                    </Button>
                                </Flex>
                            </Flex>
                            {/*<TabsComponentPage/>*/}

                            {/* each sprint preview component for projectId page */}
                            {/*<Box onClick={handleClick}>*/}
                            {/*    <SprintPreviewComponent/>*/}
                            {/*</Box>*/}

                            {/* 스프린트 목록을 반복하여 렌더링 */}
                            {sprints.map((sprint) => (
                                <Box key={sprint.id} onClick={() => handleSprintClick(sprint.id)} style={{ cursor: 'pointer' }}>
                                    <SprintPreviewComponent
                                        sprintId={sprint.id}
                                        title={sprint.title}
                                        description={sprint.description}
                                    />
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

export default ProjectDetailPage;
