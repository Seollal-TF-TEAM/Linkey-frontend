import React from 'react';
import {Box, Card, Flex, SimpleGrid, Text} from "@mantine/core";
// @ts-ignore
import TodoComponent from "./TodoPage.tsx";

function SprintPreviewComponent({sprintId, title, description}) {
    return (<>
        <SimpleGrid cols={1} spacing="lg">
            <Card
                shadow="sm"
                p="xl"
                radius="lg"
                w={1200}
                mt={30}
                ml={100}
                withBorder
            >
                <Flex direction="column" gap="md">
                    <Box>
                        <Text size="xl" mb={10}>{title}</Text>
                        <Text c="dimmed" mb={10}>Sprint Description.. {description}</Text>
                        <Text size="sm">Sprint Period: </Text>
                    </Box>

                    {/* to do list Preview*/}
                    <Box>
                        <TodoComponent/>
                    </Box>
                </Flex>
            </Card>
        </SimpleGrid>
        </>);
}

export default SprintPreviewComponent;