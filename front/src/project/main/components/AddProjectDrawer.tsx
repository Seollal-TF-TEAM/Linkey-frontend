import {useEffect, useState} from 'react';
import {Drawer, TextInput, Button, Flex, Badge, Text, MultiSelect} from '@mantine/core';

function AddProjectDrawer({ opened, close, teamList }) {
    const baseUri = process.env.REACT_APP_BASE_URL;
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [githubRepoUrl, setGithubRepoUrl] = useState('');
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const githubUserId = window.sessionStorage.getItem("githubUserId");

    console.log(teamList);


    // useEffect(() => {
    // }, [opened]);


    const fetchProjectInfo = async () => {
        const payload = {
            projectName,
            projectDescription,
            githubRepoUrl,
            teamMembers,
        };
        const teamId = "";

        try {
            // http://localhost:8080/api/projects/createProject
            const response = await fetch(`${baseUri}/projects/createProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }

            const data = await response.json();
            console.log('프로젝트 생성 완료:', data);
            // 생성완료 뭐 띄워야하나?
            close(); // 성공 시 드로어 닫음
        } catch (error) {
            console.error('프로젝트 생성 실패:', error);
        }
    };
    fetchProjectInfo();


    return (
        <Drawer
            opened={opened}
            onClose={close}
            position="right"
            size="xl"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
            <Text style={{ fontSize: "40px", textDecoration: "underline", fontWeight: "300"  }} ml={20}> Add Project </Text>

            <Flex direction="column" m={35}>

                {/* Project Name */}
                <TextInput
                    size="lg"
                    label="Project name"
                    placeholder="Project name"
                    m={10}
                    value={projectName}
                    onChange={(e) => setProjectName(e.currentTarget.value)}
                />

                {/* Project Description */}
                <TextInput
                    size="lg"
                    label="Project Description"
                    placeholder="Project Description"
                    m={10}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.currentTarget.value)}
                />

                {/* Github Repository */}
                <Flex gap="md" align="flex-end" m={10}>
                    <TextInput
                        size="md"
                        label="Github Repository"
                        placeholder="Github Repository"
                        style={{ flex: 9 }}
                        value={githubRepoUrl}
                        onChange={(e) => setGithubRepoUrl(e.currentTarget.value)}
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
                <Flex gap="md" align="flex-end" m={10}>
                    <MultiSelect
                        size="md"
                        label="Add Team"
                        placeholder="Choose your team"
                        style={{ flex: 9 }}
                        data={teamList.name} // 여기!
                        searchable
                    />
                    <Button
                        variant="filled"
                        color="#545454"
                        size="md"
                        style={{ flex: 1 }}
                        mt={30}
                    >
                        Add
                    </Button>
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

export default AddProjectDrawer;
