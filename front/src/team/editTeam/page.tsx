import { useState, useEffect } from 'react';
import { Drawer, TextInput, Button, Flex, Text, Group, MultiSelect } from '@mantine/core';

export function EditTeamDrawer({ opened, onClose, team }) {
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);

    // members 전체 다 가져와야하나?
    const allMembers = ['은정', '정현', '원호', '대연', '민지', '홍찬', '슬기'];

    // team sample data
    // const teams = [
    //     {
    //         name: "Alpha Team",
    //         description: "Focused on cloud development.",
    //         members: [
    //             { githubUserName: 'HongChan1412', githubProfileUrl: 'https://github.com/HongChan1412' },
    //             { githubUserName: 'letsgojh0810', githubProfileUrl: 'https://github.com/letsgojh0810' }
    //         ]
    //     },

    // team이 변경될 때 마다 상태 업데이트!
    useEffect(() => {
        if (team) {
            setTeamName(team.name);
            setTeamDescription(team.description);
            setSelectedMembers(team.members.map(member => member.githubUserName));
        }
    }, [team]);

    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            position="right"
            size="xl"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
            <Text style={{ fontSize: "40px", textDecoration: "underline", fontWeight: "300" }} ml={20}>
                Edit Team
            </Text>

            <Flex direction="column" m={35}>
                {/* 팀 이름 입력 */}
                <TextInput
                    size="lg"
                    label="Team Name"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(event) => setTeamName(event.currentTarget.value)}
                    m={10}
                />
                {/* 팀 설명 입력 */}
                <TextInput
                    size="lg"
                    label="Team Description"
                    placeholder="Enter team description"
                    value={teamDescription}
                    onChange={(event) => setTeamDescription(event.currentTarget.value)}
                    m={10}
                />
                {/* 멤버 추가 및 삭제 */}
                <MultiSelect
                    size="md"
                    label="Edit Team Members"
                    placeholder="Add or remove members"
                    data={allMembers}
                    value={selectedMembers}
                    onChange={setSelectedMembers}
                    searchable
                    m={10}
                />
                {/* 수정 완료 버튼 */}
                <Group position="right" mt={20} mr={10}>
                    <Button variant="filled" color="#545454" size="md" onClick={onClose}>
                        Save Changes
                    </Button>
                </Group>
            </Flex>
        </Drawer>
    );
}

export default EditTeamDrawer;
