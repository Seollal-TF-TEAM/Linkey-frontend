import React, { useEffect, useState }from 'react';
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
} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
// @ts-ignore
import AddProjectDrawer from '../main/components/AddProjectDrawer.tsx'
// @ts-ignore
import NavbarComponent from "../../components/layout/Navbar.tsx";


function ProjectPage() {
    const [opened, { open, close }] = useDisclosure(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const baseUri = process.env.REACT_APP_BASE_URL;
    const githubUserId = sessionStorage.getItem('githubUserId');

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


    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

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
                                : theme.colors.gray[0],
                    },
                })}
            >

                {/* Navbar 영역 */}
                <NavbarComponent />

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
                    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '16px' }}>
                        <Title order={1} mb="lg" style={{ position: 'absolute', top: 16, left: 250 }}>
                            Project
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
                                <Button variant="transparent" color="#545454" size="xl" onClick={open}>+</Button>
                            </Card>

                            {projects.map((project) => (
                                <Card
                                    shadow="sm"
                                    p="xl"
                                    key={project.projectId}
                                    style={{ height: '200px', top: '100px', width: '300px' }}
                                >
                                    <Text weight="bold" mb="xs">
                                        {project.projectName} {/* 프로젝트 이름 표시 */}
                                    </Text>
                                    <Text size="sm" color="dimmed" mb="md">
                                        팀: {project.teamName} {/* 팀 이름 표시 */}
                                    </Text>
                                    <Button
                                        variant="light"
                                        color="#545454"
                                        onClick={() => handleProjectClick(project.projectId)}
                                    >
                                        상세 보기
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
