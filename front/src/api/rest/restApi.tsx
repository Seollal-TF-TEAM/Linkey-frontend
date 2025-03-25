import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // 실제 Spring Boot 서버 주소

export async function getProjects() {
    const response = await axios.get(`${BASE_URL}/api/getUserProjects`);
    return response.data;
}

export async function getProject() {
    const response = await axios.get(`${BASE_URL}/api/getUserProject`);
    return response.data;
}

export async function createProject(project) {
    const response = await axios.post(`${BASE_URL}/api/createProject`, project);
    return response.data;
}
