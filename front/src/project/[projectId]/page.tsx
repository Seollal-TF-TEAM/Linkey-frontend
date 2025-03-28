import React, { useState, useEffect } from 'react';
import {AppShell, Badge, Box, Button, Card, Center, Flex, Group, SimpleGrid, Text, ThemeIcon, Title} from '@mantine/core';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { IconBrandGithub } from '@tabler/icons-react';
// @ts-ignore
import TabsComponentPage from "./Components/TabsPage.tsx";
// @ts-ignore
import TodoComponent from "./Components/TodoPage.tsx";
// @ts-ignore
import SprintPreviewComponent from "./Components/SprintPreviewPage.tsx";
import {IconPlus} from '@tabler/icons-react';
// @ts-ignore
import NavbarComponent from "../../components/layout/Navbar.tsx";


function ProjectDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const baseUri = process.env.REACT_APP_BASE_URL;


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


    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

// 프로젝트 상세조회
//     useEffect(() => {
//         if (projectId) {
//             fetch(`${baseUri}/project/projectDetail?projectId=${projectId}`)
//                 .then(response => response.json())
//                 .then(data => setProjectData(data))
//                 .catch(error => console.error('Error:', error));
//         }
//     }, [projectId]);

// 스프린트 리스트 조회
//     useEffect(() => {
//             if (projectId) {
//                 fetch(`${baseUri}/project/${projectId}/sprint`)
//                     .then(response => response.json())
//                     .then(data => setSprintData(data.sprints[0]))
//                     .catch(error => console.error('Error:', error));
//             }
//         }, [projectId, sprintId, baseUri])


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
                <NavbarComponent/>

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
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
                                            leftSection={<IconBrandGithub size={16} /> }
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
                                            leftSection={<IconBrandGithub size={16} /> }
                                        >
                                            Repository
                                        </Badge>
                                    </a>
                                </Group>
                            )}
                        </Flex>

                    </Box>

                    <Box p="md" mt={100}>
                        <Flex direction="column">
                            <Flex justify="space-between">
                                <Title>Sprint</Title>
                                <Flex align="center">
                                    <Button size="sm" mr={100} variant="transparent" color="gray">
                                        <Text color="darkgray" size="lg">Add Sprint</Text>
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
