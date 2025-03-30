import {Drawer, TextInput, Button, Flex, Badge, Text, MultiSelect} from '@mantine/core';

function editProjectDrawer({ opened, close }) {
    return (
        <Drawer
            opened={opened}
            onClose={close}
            position="right"
            size="xl"
        >
            <Text style={{ fontSize: "40px", textDecoration: "underline", fontWeight: "300"  }} ml={20}> Add Project </Text>

            <Flex direction="column" m={35}>

                {/* Team Name */}
                <Flex gap="md" align="flex-end" m={10}>
                    <TextInput
                        size="md"
                        label="Team name"
                        placeholder="Team name"
                        style={{ flex: 9 }}
                    />
                    <Button
                        variant="filled"
                        color="#545454"
                        size="md"
                        style={{ flex: 1 }}
                        mt={30}>Save</Button>
                </Flex>

                {/* Project Name */}
                <TextInput
                    size="lg"
                    label="Project name"
                    placeholder="Project name"
                    m={10}
                />

                {/* Project Description */}
                <TextInput
                    size="lg"
                    label="Project Description"
                    placeholder="Project Description"
                    m={10}
                />

                {/* Github Repository */}
                <Flex gap="md" align="flex-end" m={10}>
                    <TextInput
                        size="md"
                        label="Github Repository"
                        placeholder="Github Repository"
                        style={{ flex: 9 }}
                    />
                    <Button
                        variant="filled"
                        color="#545454"
                        size="md"
                        style={{ flex: 1 }}
                        mt={30}
                    >
                        Validate
                    </Button>
                </Flex>

                {/* Validate Github Repository Address */}
                <Flex direction={"row"}>
                    {/* git repo addr badge - 추후 close button 추가 */}
                    <Badge color="#545454" size="lg" mt={10} ml={10}>
                        github.com/githublink1
                    </Badge>

                    <Badge color="#545454" size="lg" mt={10} ml={10}>
                        github.com/githublink2
                    </Badge>
                </Flex>

                {/* Add Team */}
                <Flex gap="md" align="flex-end" m={10} >
                    {/* 팀 멤버 데이터 추후 수정 */}
                    <MultiSelect
                        size="md"
                        label="Add Team"
                        placeholder="Choose your team members"
                        style={{ flex: 9 }}
                        data={['은정', '정현', '원호', '대연', '태규']}
                        searchable
                    />
                    <Button
                        variant="filled"
                        color="#545454"
                        size="md"
                        style={{ flex: 1 }}
                        mt={30}>Add</Button>
                </Flex>

                {/* Badge - Added Team members 추후 수정 */}
                <Flex direction={"row"}>
                    <Badge color="#545454" size="lg" mt={10} ml={10}>
                        member 1
                    </Badge>

                    <Badge color="#545454" size="lg" mt={10} ml={10}>
                        member 2
                    </Badge>
                </Flex>

            </Flex>
        </Drawer>
    );
}

export default editProjectDrawer;
