

import React, { useEffect, useState } from 'react';
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
    Stack
} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
// @ts-ignore
import AddProjectDrawer from '../main/components/AddProjectDrawer.tsx'
// @ts-ignore
import NavbarComponent from "../../components/layout/Navbar.tsx";

function ProjectPage() {
    const [opened, { open, close }] = useDisclosure(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    // 테스트 데이터
    const mockProjects = {
        projects: [
            {
                projectId: 1,
                projectName: "Linkey",
                teamName: "LinkeyTeam"
            },
            {
                projectId: 2,
                projectName: "TaskManager",
                teamName: "ProductivityCrew"
            },
            {
                projectId: 3,
                projectName: "EcommercePlatform",
                teamName: "ShopDev"
            },
            {
                projectId: 4,
                projectName: "SocialApp",
                teamName: "ConnectSphere"
            },
            {
                projectId: 5,
                projectName: "FitnessTracker",
                teamName: "HealthSync"
            }
        ]
    };

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await fetch(`${baseUri}/project/projectList?githubUserId=${githubUserId}`);
//                 const data = await response.json();
//                 setProjects(data.projects || []); // 응답에서 projects 배열을 상태에 저장
//             } catch (error) {
//                 console.error('프로젝트 목록 불러오기 실패:', error);
//             }
//         };
//
//         fetchProjects();
//     }, [githubUserId]);

    // API 대신 테스트 데이터를 사용
    useEffect(() => {
        // 실제 API 호출 대신 mock 데이터를 설정
        setProjects(mockProjects.projects);
    }, []);

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
    }

    return (
        <>
            {/* 프로젝트 추가 사이드 페이지 컴포넌트 */}
            <AddProjectDrawer opened={opened} close={close} />

            <AppShell
                padding="md"
                navbar={{ width: 220, breakpoint: 'sm' }}
                styles={(theme) => ({
                    main: {
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[1],
                    },
                })}
            >

                {/* Navbar 영역 */}
                <NavbarComponent />

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
                    <Center>
                        <div style={{ position: 'absolute', top: 16, left: 300 }}>
                            <Title order={1} mb="lg" color="dark">
                                Projects
                            </Title>
                        </div>

                        <SimpleGrid cols={3} spacing="xl" verticalSpacing="md" mt={70}>
                            <Card
                                shadow="md"
                                p="xl"
                                radius="md"
                                h="230"
                                w="320"
                                display="flex"
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <Button variant="transparent" color="dark" size="xl" onClick={open}>+</Button>
                            </Card>

                            {projects.map((project) => (
                                <Card
                                    shadow="md"
                                    p="lg"
                                    key={project.projectId}
                                    radius="md"
                                    h="230"
                                    w="320"
                                    display="flex"
                                    style={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ddd',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Stack spacing="sm" style={{ flexGrow: 1 }}>
                                        <Text weight={700} mb="xs" color="dark" size="lg" fw={700}>
                                            {project.projectName} {/* 프로젝트 이름 표시 */}
                                        </Text>
                                        <Text size="sm" color="gray" mb="md">
                                            Team descriptions..
                                        </Text>
                                        <Text size="sm" color="gray" mb="md">
                                            Team: {project.teamName} {/* 팀 이름 표시 */}
                                        </Text>
                                    </Stack>
                                    <Button
                                        variant="light"
                                        color="dark"
                                        fullWidth
                                        onClick={() => handleProjectClick(project.projectId)}
                                    >
                                        View Details
                                    </Button>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </Center>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

export default ProjectPage;
