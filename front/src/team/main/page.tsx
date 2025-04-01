import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    AppShell,
    Center,
    Text,
    Button,
    Title,
    SimpleGrid,
    Card,
    TextInput, Flex, MultiSelect
} from '@mantine/core';
// @ts-ignore
import NavBarComponent from '../../components/layout/Navbar.tsx'
// @ts-ignore
import AddTeamDrawer from "../createTeam/page.tsx";

function TeamPage() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            {/* 새 팀 생성용 사이드 페이지 */}
            <AddTeamDrawer opened={opened} onClose={close} />

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
                <NavBarComponent/>

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
                    <Center>
                        <div style={{ position: 'absolute', top: 16, left: 300 }}>
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

                        <SimpleGrid cols={4} spacing="lg" verticalSpacing="xs" mt={70}>
                            {/* 새 팀 생성용 카드 (+) */}
                            <Card
                                shadow="sm"
                                p="xl"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:'300px', top:'100px', width: '300px' }}
                            >
                                {/* 새 프로젝트 생성용 사이드 페이지 열기 */}
                                <Button variant="transparent" color="#545454" size="xl" onClick={open}>+</Button>
                            </Card>

                            {/* 기존 팀 카드 (3개 예시) */}
                            {[...Array(3)].map((_, index) => (
                                <Card shadow="sm" p="xl" key={index} style={{ height: '300px', top:'100px', width: '300px' }}>
                                    <Text weight="bold" mb="xs">
                                        Team name
                                    </Text>
                                    <Text size="sm" color="dimmed" mb="md">
                                        Team description
                                    </Text>
                                    <Text size="sm" color="dimmed" mb="md">
                                        Team members :
                                    </Text>
                                    {/* team edit side page component */}
                                    <Button variant="light" color="#545454" >Edit</Button>
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
