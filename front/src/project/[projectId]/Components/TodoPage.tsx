import { useState, useEffect } from 'react';
import { List, ThemeIcon } from '@mantine/core';
import { IconSquare } from '@tabler/icons-react';
import {useParams} from "react-router-dom";

function TodoComponent({ sprintId }: { sprintId: number }) {
    const { projectId } = useParams(); // url에서 project id 받아옴
    const baseUri = process.env.REACT_APP_BASE_URL;
    const [todos, setTodos] = useState([]);

    // http://localhost:8080/api/todoList?=${sprintId}
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`${baseUri}/todos/todoList?sprintId=${sprintId}`);
                const data = await response.json();
                const todoList = data?.result?.data || [];
                setTodos(todoList);
            } catch (error) {
                console.error('프로젝트 목록 불러오기 실패:', error);
            }
        };

        fetchTodos();
    }, []);

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
            {todos.map((todo) => (
            <List.Item  key={todo.todoId}>{todo.todoContents}</List.Item>
            ))}
        </List>
    );
}
export default TodoComponent;