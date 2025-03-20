import React from 'react';
import { AppShell, Text, Group } from '@mantine/core';

const Navbar = () => {
    return (
        <AppShell.Navbar width={{ base: 220 }} p="md" style={{ backgroundColor: '#f3f3f3' }}>
            {/* 로고 */}
            <Text size="xl" weight="bold" mb="xl">
                Lin-key
            </Text>

            {/* 메뉴 */}
            <div style={{ marginBottom: 40 }}>
                <Text weight="bold">DashBoard</Text>
                <Text weight="bold" style={{ textDecoration: 'underline' }}>
                    Project
                </Text>
            </div>

            {/* 하단 프로필 */}
            <div style={{ marginTop: 'auto' }}>
                <Group spacing="sm" mb="md">
                    <Text weight="bold">Name</Text>
                    <Text size="xs" color="dimmed">
                        mk1.com@soria
                    </Text>
                </Group>
            </div>
        </AppShell.Navbar>
    );
};

export default Navbar;
