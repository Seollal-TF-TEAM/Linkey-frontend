import React, { useState, useEffect } from 'react';
import {
    Drawer,
    TextInput,
    Button,
    Flex,
    Text,
    Group,
    Badge,
    Divider,
    ScrollArea,
} from '@mantine/core';
import axios from 'axios';

// ✅ 환경 변수에서 API Base URL 가져오기
const baseUrl = process.env.REACT_APP_BASE_URL;

export function AddTeamDrawer({ opened, onClose }) {
    const [teamName, setTeamName] = useState('');
    const [teamDesc, setTeamDesc] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    // 🔍 유저 검색
    useEffect(() => {
        if (search.length < 2) return;

        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${baseUrl}/users/search`, {
                    params: { keyword: search },
                });
                const result = res.data.result.data || [];

                // 중복 제외
                const filtered = result.filter(
                    (user) => !selectedMembers.some((m) => m.githubUserId === user.githubUserId)
                );

                setSearchResults(filtered);
            } catch (err) {
                console.error('검색 실패:', err);
            }
        };

        const delay = setTimeout(fetchUsers, 300);
        return () => clearTimeout(delay);
    }, [search]);

    // ✅ 멤버 추가
    const addMember = (user) => {
        setSelectedMembers([...selectedMembers, user]);
        setSearch('');
        setSearchResults([]);
    };

    // ✅ 멤버 제거
    const removeMember = (id) => {
        setSelectedMembers(selectedMembers.filter((m) => m.githubUserId !== id));
    };

    // ✅ 팀 생성
    const handleAddTeam = async () => {
        try {
            const payload = {
                teamName: teamName,
                teamDesc: teamDesc,
                teamMembers: selectedMembers.map((m) => ({
                    githubUserId: m.githubUserId
                }))
            };

            await axios.post(`${baseUrl}/teams/createTeam`, payload);

            // ✅ 성공 alert
            alert('팀이 성공적으로 생성되었습니다!');
            onClose();
        } catch (err) {
            console.error('팀 생성 실패:', err);
            alert('팀 생성에 실패했습니다 😢');
        }
    };


    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            position="right"
            size="xl"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
            <Text style={{ fontSize: '40px', textDecoration: 'underline', fontWeight: '300' }} ml={20}>
                Add Team
            </Text>

            <Flex direction="column" m={35}>
                <TextInput
                    size="lg"
                    label="Team name"
                    placeholder="Team name"
                    m={10}
                    value={teamName}
                    onChange={(e) => setTeamName(e.currentTarget.value)}
                />
                <TextInput
                    size="lg"
                    label="Team Desc"
                    placeholder="Team Desc"
                    m={10}
                    value={teamDesc}
                    onChange={(e) => setTeamDesc(e.currentTarget.value)}
                />

                <Divider my="sm" />

                <TextInput
                    size="md"
                    label="Search members"
                    placeholder="Enter GitHub name"
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    m={10}
                />

                {/* 🔍 검색 결과 리스트 */}
                {searchResults.length > 0 && (
                    <ScrollArea h={180} mx={10} mb={10}>
                        <Flex direction="column" gap="sm">
                            {searchResults.map((user) => (
                                <Group
                                    key={user.githubUserId}
                                    position="apart"
                                    p="sm"
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: 8,
                                        backgroundColor: '#f9f9f9',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#eaeaea')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                                >
                                    <Group spacing="sm">
                                        <Badge
                                            color="gray"
                                            variant="filled"
                                            size="lg"
                                            radius="xl"
                                            style={{ width: 30, height: 30, textAlign: 'center', padding: 5 }}
                                        >
                                            {user.githubUserName.charAt(0).toUpperCase()}
                                        </Badge>
                                        <Text size="sm" weight={500}>{user.githubUserName}</Text>
                                    </Group>
                                    <Button size="xs" variant="light" onClick={() => addMember(user)}>
                                        추가
                                    </Button>
                                </Group>
                            ))}
                        </Flex>
                    </ScrollArea>
                )}

                {/* ✅ 선택된 멤버 리스트 */}
                {selectedMembers.length > 0 && (
                    <Group m={10} spacing="xs">
                        {selectedMembers.map((user) => (
                            <Badge
                                key={user.githubUserId}
                                size="lg"
                                radius="sm"
                                color="gray"
                                rightSection={
                                    <span
                                        style={{ cursor: 'pointer', marginLeft: 8 }}
                                        onClick={() => removeMember(user.githubUserId)}
                                    >
                                        ×
                                    </span>
                                }
                            >
                                {user.githubUserName}
                            </Badge>
                        ))}
                    </Group>
                )}

                <Group position="right" mt={20} mr={10}>
                    <Button variant="filled" color="#545454" size="md" onClick={handleAddTeam}>
                        Add &gt;
                    </Button>
                </Group>
            </Flex>
        </Drawer>
    );
}

export default AddTeamDrawer;
