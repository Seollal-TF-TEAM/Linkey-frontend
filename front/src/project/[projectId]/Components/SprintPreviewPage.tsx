import React from 'react';
import {Box, Card, Flex, SimpleGrid, Text, Badge, Group} from "@mantine/core";
import { format, differenceInDays } from 'date-fns';
import { IconCalendar } from '@tabler/icons-react';
// @ts-ignore
import TodoComponent from "./TodoPage.tsx";

function SprintPreviewComponent({ sprintId, sprintName, sprintStartAt, sprintEndAt }) {
    const days = differenceInDays(new Date(sprintEndAt), new Date(sprintStartAt));

    return (
        <SimpleGrid cols={1} spacing="lg">
            <Card
                shadow="md" // 약간 더 강한 그림자
                p="xl"
                radius="lg"
                w={1200}
                mt={30}
                ml={100}
                withBorder
                style={{ backgroundColor: '#f9fafb' }} // 밝은 배경색 추가
            >
                <Flex direction="column" gap="md">
                    <Box>
                        <Text size="xl" weight={700} mb={10} color="dark">
                            {sprintName}
                        </Text>
                        <Group spacing="xs">
                            <IconCalendar size={18} color="gray" /> {/* 캘린더 아이콘 */}
                            <Text size="sm" color="gray">
                                Sprint Period:{' '}
                                <Badge color="teal" variant="light">
                                    {format(new Date(sprintStartAt), 'MMMM d, yyyy')}
                                </Badge>{' '}
                                ~{' '}
                                <Badge color="teal" variant="light">
                                    {format(new Date(sprintEndAt), 'MMMM d, yyyy')}
                                </Badge>
                            </Text>
                        </Group>
                        <Text size="sm" color="gray">Duration: {days} days</Text>
                    </Box>
                    <Box>
                        <TodoComponent sprintId={sprintId}/>
                    </Box>
                </Flex>
            </Card>
        </SimpleGrid>
    );
}

export default SprintPreviewComponent;



