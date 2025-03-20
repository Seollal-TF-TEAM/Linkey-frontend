import React from 'react';
import axios from "axios";
import {
    AppShell,
    Text,
    Group,
    Button,
    Title,
    SimpleGrid,
    Card
} from '@mantine/core';

function ProjectPage() {
    return (
        <AppShell
            padding="md"
            navbar={
                <AppShell.Navbar width={{ base: 220 }} p="md" style={{ backgroundColor: '#f3f3f3' }}>
                    {/* 로고 영역 */}
                    <Text size="xl" weight="bold" mb="xl">
                        Lin-key
                    </Text>

                    {/* 메뉴 영역 */}
                    <div style={{ marginBottom: 40 }}>
                        <Button
                            variant="subtle"
                            color="dark"
                            fullWidth
                            style={{ justifyContent: 'flex-start', marginBottom: 16 }}
                        >
                            DashBoard
                        </Button>
                        <Button
                            variant="subtle"
                            color="dark"
                            fullWidth
                            style={{
                                justifyContent: 'flex-start',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                            }}
                        >
                            Project
                        </Button>
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
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            {/* 메인 콘텐츠 영역 */}
            <Title order={1} mb="lg">
                Project
            </Title>

            {/* 카드 그리드 */}
            <SimpleGrid cols={3} spacing="lg">
                {/* 새 프로젝트 생성용 카드 (+) */}
                <Card
                    shadow="sm"
                    p="xl"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text size="xl" color="dimmed" style={{ fontSize: '3rem' }}>
                        +
                    </Text>
                </Card>

                {/* 기존 프로젝트 카드 (5개 예시) */}
                {[...Array(5)].map((_, index) => (
                    <Card shadow="sm" p="md" key={index}>
                        <Text weight="bold" mb="xs">
                            Project name
                        </Text>
                        <Text size="sm" color="dimmed" mb="md">
                            Project description
                            <br />
                            - test added djslak 2.5
                        </Text>
                        <Button variant="filled">Button</Button>
                    </Card>
                ))}
            </SimpleGrid>
        </AppShell>
    );
}

export default ProjectPage;
