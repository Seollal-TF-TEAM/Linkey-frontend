import React, { useState, useEffect } from 'react';
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
    const { projectId } = useParams(); // url에서 project id 받아옴
    const baseUri = process.env.REACT_APP_BASE_URL;
    const [project, setProject] = useState([]);
    const [sprints, setSprints] = useState([]);

    // Add sprint Drawer 상태 관리
    const [isAddSprintDrawerOpen, setIsAddSprintDrawerOpen] = useState(false);
    const openAddSprintDrawer = () => setIsAddSprintDrawerOpen(true);
    const closeAddSprintDrawer = () => setIsAddSprintDrawerOpen(false);

    // navigate to sprint detail page
    const handleSprintClick = (sprintId) => {
        navigate(`${window.location.pathname}/sprint/${sprintId}`);
    };

    // http://localhost:8080/api/projects/projectDetail?projectId=12
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${baseUri}/projects/projectDetail?projectId=${projectId}`);
                const data = await response.json();
                const projectDetail = data?.result?.data;
                setProject(projectDetail);
            } catch (error) {
                console.error('프로젝트 목록 불러오기 실패:', error);
            }
        };

        // http://localhost:8080/api/sprints/sprintList?projectId=17
        const fetchSprints = async () => {
            try {
                const response = await fetch(`${baseUri}/sprints/sprintList?projectId=${projectId}`);
                const data = await response.json();
                const sprintList = data?.result?.data?.sprints || [];
                setSprints(sprintList);
            } catch (error) {
                console.error('프로젝트 목록 불러오기 실패:', error);
            }
        };

        fetchProject(); // 프로젝트 데이터 가져오기
        fetchSprints(); // 프로젝트의 스프린트 리스트 데이터 가져오기
    }, []);

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
                            <Title order={1}>{project.projectName}</Title>

                            {/* project description */}
                            <Text>{project.projectDesc}</Text>

                            {/* project team members */}
                            <Group align="center" spacing="xs">
                                <Text>members :</Text>
                                {/* badge for team members */}
                                {project?.teamMembers?.map((member, index) => (
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

                            {project.githubRepoUrl && (
                                <Group align="center" spacing="xs">
                                    <Text>GitHub:</Text>
                                    <a
                                        href={project.githubRepoUrl}
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
