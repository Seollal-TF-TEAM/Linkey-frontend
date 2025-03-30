import React, { useState } from 'react';
import {
    AppShell,
    Button,
    Card,
    SimpleGrid,
    Text,
    Title,
    Divider,
    TextInput,
    Checkbox,
    Group,
    Paper,
    Stack,
    Box,
    Image,
    ActionIcon,
    Flex,
    Progress,
    Container
} from '@mantine/core';
import { useParams } from "react-router-dom";
import { IconPlus, IconTrash } from '@tabler/icons-react';
// @ts-ignore
import NavbarComponent from "../../components/layout/Navbar.tsx";
// @ts-ignore
import SprintPreviewComponent from "../../project/[projectId]/Components/SprintPreviewPage.tsx";

function SprintPage() {
    const { sprintId } = useParams();
    const [todoInput, setTodoInput] = useState('');

    // todo sample data
    const [todos, setTodos] = useState([
        { id: 1, text: '백엔드 API 구현하기', completed: false },
        { id: 2, text: '프론트엔드 UI 디자인', completed: true },
        { id: 3, text: '테스트 케이스 작성', completed: false },
        { id: 4, text: '문서 업데이트', completed: false }
    ]);

    // Sprint statistics and info sample data
    const sprintInfo = {
        name: 'Sprint #1',
        startDate: '2025-03-20',
        endDate: '2025-04-03',
        progress: 35,
        tasks: 12,
        completedTasks: 4
    };

    // Sample sprint images sample data
    const sprintImages = [
        { id: 1, title: '기능 흐름도', url: 'https://i.namu.wiki/i/vOn70YXbH0R3hnZNxud0bKMpzxcItgmHSHzPvl56fDeEyJduyfI0ql3AE_BSVyHuCF9SJtoaDw1BupQ3PKq5ZQ.webp' },
        { id: 2, title: '디자인 목업', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnhd2ZQwsyWgMUIqDt2t_9kIcgpeb7ZypUTIOn6aDBH3F4MoQfB_6KbFYE3qXcQUU2Mg&usqp=CAU' },
        { id: 3, title: '스프린트 회의', url: 'https://i.pinimg.com/236x/28/f1/00/28f100d4a735b6a176c54f8c03e2820e.jpg' }
    ];

    const handleAddTodo = () => {
        if (todoInput.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: todoInput,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setTodoInput('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
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
                {/* Navbar 영역 */}
                <NavbarComponent />

                {/* 메인 콘텐츠 영역 */}
                <AppShell.Main>
                    <Container size="lg">
                        {/* Sprint Header */}
                        <Group position="apart" mt="md" mb="30">
                            <Box>
                                <Title order={1} color="gray.8">{sprintInfo.name}</Title>
                                <Text size="sm" color="gray.6">
                                    {sprintInfo.startDate} ~ {sprintInfo.endDate}
                                </Text>
                            </Box>
                            <Button variant="light" color="gray" radius="xl">setting</Button>
                        </Group>

                        <Divider mb="lg" />

                        {/* Progress Stats */}
                        <SimpleGrid cols={2} spacing="lg" mb="30">
                            <Paper p="md" radius="sm" withBorder shadow="xs">
                                <Text weight={500} color="gray.7" mb="xs">Progress</Text>
                                <Group position="apart" align="flex-end">
                                    <Text size="xl" weight={700} color="gray.8">{sprintInfo.progress}%</Text>
                                    <Text size="sm" color="gray.6">All</Text>
                                </Group>
                                <Progress value={sprintInfo.progress} mt="md" size="md" color="gray.6" />
                            </Paper>

                            <Paper p="md" radius="sm" withBorder shadow="xs">
                                <Text weight={500} color="gray.7" mb="xs">Task</Text>
                                <Group position="apart" align="flex-end">
                                    <Group spacing={4}>
                                        <Text size="xl" weight={700} color="gray.8">{sprintInfo.completedTasks}</Text>
                                        <Text size="sm" color="gray.6">/ {sprintInfo.tasks}</Text>
                                    </Group>
                                    <Text size="sm" color="gray.6">Complete</Text>
                                </Group>
                                <Progress
                                    value={(sprintInfo.completedTasks / sprintInfo.tasks) * 100}
                                    mt="md"
                                    size="md"
                                    color="gray.6"
                                />
                            </Paper>
                        </SimpleGrid>

                        {/* Todo List */}
                        <Card shadow="sm" p="lg" radius="sm" withBorder mb="30">
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position="apart">
                                    <Title order={3} color="gray.8">To do List</Title>
                                    <Text color="gray.6">
                                        {todos.filter(todo => todo.completed).length}/{todos.length} Complete
                                    </Text>
                                </Group>
                            </Card.Section>

                            <Stack spacing="xs" mt="md">
                                {/* Add Todo Input */}
                                <Group spacing="xs">
                                    <TextInput
                                        placeholder="Add a new task"
                                        value={todoInput}
                                        onChange={(e) => setTodoInput(e.target.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Button leftIcon={<IconPlus size={16} />} onClick={handleAddTodo} color="gray.7" variant="outline">
                                        Add
                                    </Button>
                                </Group>

                                {/* Todo List */}
                                <Paper withBorder p="md" mt="xs">
                                    <Stack spacing="xs">
                                        {todos.length === 0 ? (
                                            <Text align="center" color="dimmed">No tasks available</Text>
                                        ) : (
                                            todos.map((todo) => (
                                                <Group key={todo.id} position="apart" spacing="xs">
                                                    <Group>
                                                        <Checkbox
                                                            checked={todo.completed}
                                                            onChange={() => toggleTodo(todo.id)}
                                                            color="gray.7"
                                                        />
                                                        <Text
                                                            style={{
                                                                textDecoration: todo.completed ? 'line-through' : 'none',
                                                                color: todo.completed ? 'gray' : 'inherit'
                                                            }}
                                                        >
                                                            {todo.text}
                                                        </Text>
                                                    </Group>
                                                    <ActionIcon color="white" onClick={() => deleteTodo(todo.id)}>
                                                        <IconTrash color="gray" size={16} />
                                                    </ActionIcon>
                                                </Group>
                                            ))
                                        )}
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Card>

                        {/* Images Section */}
                        <Title order={3} mb="md" color="gray.8">Images</Title>
                        <SimpleGrid cols={3} spacing="md" breakpoints={[
                            { maxWidth: 'md', cols: 2 },
                            { maxWidth: 'xs', cols: 1 }
                        ]}>
                            {sprintImages.map((img) => (
                                <Card key={img.id} p="xs" radius="sm" withBorder shadow="sm">
                                    <Card.Section>
                                        <Image
                                            src={img.url}
                                            height={180}
                                            alt={img.title}
                                        />
                                    </Card.Section>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </Container>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

export default SprintPage;