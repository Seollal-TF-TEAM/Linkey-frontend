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
    Badge,
    Group,
    Stack
} from '@mantine/core';
// @ts-ignore
import NavBarComponent from '../../components/layout/Navbar.tsx'
// @ts-ignore
import AddTeamDrawer from '../createTeam/page.tsx'
import { IconBrandGithub } from "@tabler/icons-react";
// @ts-ignore
import EditTeamDrawer from "../editTeam/page.tsx";

const teams = [
    {
        name: "Alpha Team",
        description: "Focused on cloud development.",
        members: [
            { githubUserName: 'HongChan1412', githubProfileUrl: 'https://github.com/HongChan1412' },
            { githubUserName: 'letsgojh0810', githubProfileUrl: 'https://github.com/letsgojh0810' }
        ]
    },
    {
        name: "Beta Team",
        description: "Building innovative web apps.",
        members: [
            { githubUserName: 'eundeom', githubProfileUrl: 'https://github.com/eundeom' },
            { githubUserName: 'devUser', githubProfileUrl: 'https://github.com/devUser' }
        ]
    },
    {
        name: "Gamma Team",
        description: "Exploring AI and machine learning.",
        members: [
            { githubUserName: 'mlExpert', githubProfileUrl: 'https://github.com/mlExpert' }
        ]
    }
];

function TeamPage() {
    const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [selectedTeam, setSelectedTeam] = React.useState(null);



    return (
        <>
            <AddTeamDrawer opened={openedAdd} onClose={closeAdd} />
            <EditTeamDrawer opened={openedEdit} onClose={closeEdit} team={selectedTeam}/>

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
                <NavBarComponent />

                <AppShell.Main>
                    <Center>
                        <div style={{ position: 'absolute', top: 16, left: 300 }}>
                            <Title order={1} mb="lg" color="dark">
                                Team
                            </Title>
                        </div>

                        <SimpleGrid cols={4} spacing="xl" verticalSpacing="md" mt={70}>
                            <Card
                                shadow="md"
                                p="xl"
                                radius="md"
                                h="300"
                                w="300"
                                display="flex"
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <Button variant="transparent" color="dark" size="xl" onClick={openAdd}>+</Button>
                            </Card>

                            {teams.map((team, index) => (
                                <Card
                                    shadow="md"
                                    p="lg"
                                    key={index}
                                    radius="md"
                                    h="300"
                                    w="300"
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
                                            {team.name}
                                        </Text>
                                        <Text size="sm" color="gray" mb="md">
                                            {team.description}
                                        </Text>
                                        <Text size="sm" color="gray" mb="md">
                                            <Text weight={500} mb="xs">Members:</Text>
                                            <Group spacing="xs">
                                                {team.members.map((member, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={member.githubProfileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <Badge
                                                            color="gray"
                                                            size="md"
                                                            radius="md"
                                                            style={{ cursor: 'pointer', backgroundColor: '#e0e0e0' }}
                                                            leftSection={<IconBrandGithub size={16} />}
                                                        >
                                                            {member.githubUserName}
                                                        </Badge>
                                                    </a>
                                                ))}
                                            </Group>
                                        </Text>
                                    </Stack>
                                    <Button variant="default" color="dark" fullWidth
                                            onClick={() => {
                                                setSelectedTeam(team);
                                                openEdit();
                                            }}> Edit </Button>
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
