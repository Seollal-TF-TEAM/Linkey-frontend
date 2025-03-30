import { Drawer, Checkbox, Button, Flex, Text, ScrollArea } from '@mantine/core';
import { useState } from 'react';

function GitCommitDrawer({ opened, close, commits }) {
    const [selectedCommits, setSelectedCommits] = useState([]);

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position="right"
            size="md"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
            <Text
                style={{
                    fontSize: '25px',
                    fontWeight: '500',
                }}
                ml={20}
                mb={30}
            >
                Select Git Commit
            </Text>

            <ScrollArea h={300} mx="md">
                <Checkbox.Group
                    value={selectedCommits}
                    onChange={setSelectedCommits}
                >
                    <Flex direction="column" gap="sm">
                        {commits.map((commit) => (
                            <Checkbox
                                key={commit.id}
                                value={commit.id}
                                label={commit.message}
                            />
                        ))}
                    </Flex>
                </Checkbox.Group>
            </ScrollArea>

            <Flex justify="flex-end" mt="md" mx="md">
                <Button variant="filled" color="gray" onClick={() => console.log(selectedCommits)}>
                    Save
                </Button>
            </Flex>
        </Drawer>
    );
}

export default GitCommitDrawer;
