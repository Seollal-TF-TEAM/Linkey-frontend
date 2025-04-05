import { Drawer, TextInput, Button, Flex, Text, Group, MultiSelect } from '@mantine/core';

// 👉 사이드용 Drawer 컴포넌트 (named export)
export function AddTeamDrawer({ opened, onClose }) {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            position="right"
            size="xl"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
            <Text style={{ fontSize: "40px", textDecoration: "underline", fontWeight: "300" }} ml={20}>
                Add Team
            </Text>

            <Flex direction="column" m={35}>
                <TextInput size="lg" label="Team name" placeholder="Team name" m={10} />
                <TextInput size="lg" label="Team Desc" placeholder="Team Desc" m={10} />
                <MultiSelect
                    size="md"
                    label="Select Team Members"
                    placeholder="Choose your team members"
                    data={['은정', '정현', '원호', '대연', '민지', '홍찬', '슬기']}
                    searchable
                    m={10}
                />
                <Group position="right" mt={20} mr={10}>
                    <Button variant="filled" color="#545454" size="md" onClick={onClose}>
                        Add &gt;
                    </Button>
                </Group>
            </Flex>
        </Drawer>
    );
}


export default AddTeamDrawer;
