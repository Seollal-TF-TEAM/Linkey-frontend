import { Drawer, TextInput, Button, Flex, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

function AddSprintDrawer({ opened, close }) {
    const [startAt, setStartAt] = useState(null);
    const [endAt, setEndAt] = useState(null);

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position="right"
            size="xl"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
            <Text
                style={{
                    fontSize: '40px',
                    textDecoration: 'underline',
                    fontWeight: '300',
                }}
                ml={20}
            >
                Add Sprint
            </Text>

            <Flex direction="column" m={35}>

                {/* Sprint Name */}
                <Text
                    ml={10}
                    size="lg"
                    fw={700}
                    style={{ fontSize: '1.125rem', marginBottom: '8px' }}
                >
                    Sprint Name
                </Text>
                <Flex gap="md" align="flex-end" m={10} mb={20}>
                    <TextInput
                        size="md"
                        placeholder="Sprint name"
                        style={{ flex: 9 }}
                    />
                    <Button
                        variant="filled"
                        color="#545454"
                        size="md"
                        style={{ flex: 1 }}
                    >
                        Save
                    </Button>
                </Flex>

                {/* Sprint Content */}
                <Text
                    ml={10}
                    size="lg"
                    fw={700}
                    style={{ fontSize: '1.125rem', marginBottom: '8px' }}
                >
                    Sprint Content
                </Text>
                <TextInput
                    size="lg"
                    placeholder="Sprint Content"
                    m={10}
                    mb={20}
                />

                {/* Sprint Duration */}
                <Text
                    ml={10}
                    size="lg"
                    fw={700}
                    style={{ fontSize: '1.125rem', marginBottom: '8px' }}
                >
                    Select a period
                </Text>
                <Flex gap="md" m={10}>
                    <DatePickerInput
                        placeholder="Select start date"
                        w="400"
                        value={startAt}
                        onChange={setStartAt}
                        maxDate={endAt || undefined} // startAt이 endAt보다 뒤로 못 가게 설정
                    />
                    <DatePickerInput
                        placeholder="Select end date"
                        w="400"
                        value={endAt}
                        onChange={setEndAt}
                        minDate={startAt || undefined} // endAt이 startAt보다 앞에 못 가게 설정
                    />
                </Flex>
            </Flex>


            {/* Add Button 누르면 DB upload */}
            <Button
                variant="filled"
                color="#545454"
                size="md"
                ml="630"
                style={{ marginTop: '20px' }}
            >
                Add
            </Button>
        </Drawer>
    );
}

export default AddSprintDrawer;
