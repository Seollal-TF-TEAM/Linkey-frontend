import { List, ThemeIcon } from '@mantine/core';
import { IconSquare, IconSquareFilled } from '@tabler/icons-react';

function TodoComponent() {
    return (
        <List
            spacing="xs"
            size="sm"
            center
            icon={
                <ThemeIcon color="white" size={24} radius="xl">
                    <IconSquare color="black" size={16} />
                </ThemeIcon>
            }
        >
            <List.Item>To start development server run npm start command</List.Item>
            <List.Item>Run tests to make sure your changes do not break the build</List.Item>
            <List.Item
                icon={
                    <ThemeIcon color="white" size={24} radius="xl">
                        <IconSquareFilled color="black" size={16} />
                    </ThemeIcon>
                }
            >
                Submit a pull request once you are done
            </List.Item>
        </List>
    );
}
export default TodoComponent;