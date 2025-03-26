import React from 'react';
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

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    const handleProjectClick = () => {
        // navigate(`/project/${project.id}`);
        navigate(`/project/1`);
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

                            {/* 기존 프로젝트 카드 (5개 예시) */}
                            {[...Array(5)].map((_, index) => (
                                <Card shadow="sm" p="xl" key={index} style={{ height: '200px', top:'100px', width: '300px' }}>
                                    <Text weight="bold" mb="xs">
                                        Project name
                                    </Text>
                                    <Text size="sm" color="dimmed" mb="md">
                                        Project description
                                        <br />
                                        - test added djslak 2.5
                                    </Text>
                                    <Button variant="light" color="#545454" onClick={handleProjectClick}>View Details</Button>
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
