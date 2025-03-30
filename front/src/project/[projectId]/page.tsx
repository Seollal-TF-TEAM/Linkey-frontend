import React, { useState } from 'react';
import { AppShell, Badge, Box, Button, Flex, Group, Text, Title } from '@mantine/core';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IconBrandGithub } from '@tabler/icons-react';
// @ts-ignore
import SprintPreviewComponent from "./Components/SprintPreviewPage.tsx";
// @ts-ignore
import NavbarComponent from "../../components/layout/Navbar.tsx";
// @ts-ignore
import AddSprintDrawer from "./Components/AddSprintDrawer.tsx";

function ProjectDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const baseUri = process.env.REACT_APP_BASE_URL;

    // Add sprint Drawer 상태 관리
    const [isAddSprintDrawerOpen, setIsAddSprintDrawerOpen] = useState(false);
    const openAddSprintDrawer = () => setIsAddSprintDrawerOpen(true);
    const closeAddSprintDrawer = () => setIsAddSprintDrawerOpen(false);

    // 테스트 데이터 상태 관리
    const [projectData, setProjectData] = useState({
        projectId: 123,
        projectName: "linkey",
        teamName: "linkeyTeam",
        githubRepoUrl: "https://github.com/Seollal-TF-TEAM/Linkey-frontend",
        projectDesc: "프로젝트 설명입니다.",
        teamMembers: [
            { githubUserName: "HongChan1412", githubProfileUrl: "https://github.com/HongChan1412" },
            { githubUserName: "letsgojh0810", githubProfileUrl: "https://github.com/letsgojh0810" },
            { githubUserName: "eundeom", githubProfileUrl: "https://github.com/eundeom" },
            { githubUserName: "EOTAEGYU", githubProfileUrl: "https://github.com/EOTAEGYU" }
        ]
    });

    // Sprints sample data
    const sprints = [
        { sprintId: 1, sprintName: "Sprint #1", sprintStartAt: "2025-03-01", sprintEndAt: "2025-03-15" },
        { sprintId: 2, sprintName: "Sprint #2", sprintStartAt: "2025-03-16", sprintEndAt: "2025-03-31" },
        { sprintId: 3, sprintName: "Sprint #3", sprintStartAt: "2025-04-01", sprintEndAt: "2025-04-15" },
        { sprintId: 4, sprintName: "Sprint #4", sprintStartAt: "2025-04-16", sprintEndAt: "2025-04-30" }
    ];

    // navigate to sprint detail page
    const handleSprintClick = (sprintId) => {
        navigate(`${window.location.pathname}/sprint/${sprintId}`);
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
                {/* Navbar */}
                <NavbarComponent />

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main style={{ marginLeft: 250, padding: '20px' }}>
                    <Box p="md">
                        <Flex direction="column" gap="lg">
                            {/* project name */}
                            <Title order={1}>{projectData.projectName}</Title>

                            {/* project description */}
                            <Text>{projectData.projectDesc}</Text>

                            {/* project team members */}
                            <Group align="center" spacing="xs">
                                <Text>members :</Text>
                                {/* badge for team members */}
                                {projectData.teamMembers.map((member, index) => (
                                    <a
                                        key={index}
                                        href={member.githubProfileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Badge
                                            color="rgba(94, 94, 94, 1)"
                                            size="lg"
                                            radius="md"
                                            style={{ cursor: 'pointer' }}
                                            leftSection={<IconBrandGithub size={16} />}
                                        >
                                            {member.githubUserName}
                                        </Badge>
                                    </a>
                                ))}
                            </Group>

                            {projectData.githubRepoUrl && (
                                <Group align="center" spacing="xs">
                                    <Text>GitHub:</Text>
                                    <a
                                        href={projectData.githubRepoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Badge
                                            color="blue"
                                            size="lg"
                                            radius="md"
                                            style={{ cursor: 'pointer' }}
                                            leftSection={<IconBrandGithub size={16} />}
                                        >
                                            Repository
                                        </Badge>
                                    </a>
                                </Group>
                            )}
                        </Flex>
                    </Box>

                    <Box p="md" mt={50}>
                        <Flex direction="column">
                            <Flex justify="space-between">
                                <Title>Sprints</Title>
                                <Flex align="center">
                                    <Button size="sm" variant="transparent" color="gray" onClick={openAddSprintDrawer}>
                                        <Text color="darkgray" size="lg">Add Sprint +</Text>
                                    </Button>
                                </Flex>
                            </Flex>

                            {/* AddSprintDrawer component */}
                            <AddSprintDrawer opened={isAddSprintDrawerOpen} close={closeAddSprintDrawer} />

                            {/* 스프린트 목록을 반복하여 렌더링 */}
                            {sprints.map((sprint) => (
                                <Box key={sprint.sprintId} onClick={() => handleSprintClick(sprint.sprintId)} style={{ cursor: 'pointer' }}>
                                    <SprintPreviewComponent
                                        sprintId={sprint.sprintId}
                                        sprintName={sprint.sprintName}
                                        sprintStartAt={sprint.sprintStartAt}
                                        sprintEndAt={sprint.sprintEndAt}
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
