import axios from 'axios';

const BASE_URL = 'https://linkey.co.kr/api'; // 실제 Spring Boot 서버 주소

export async function getProjects() {
    const response = await axios.get(`${BASE_URL}/getUserProjects`);
    return response.data;
}

export async function getProject() {
    const response = await axios.get(`${BASE_URL}/getUserProject`);
    return response.data;
}

export async function createProject(project) {
    const response = await axios.post(`${BASE_URL}/createProject`, project);
    return response.data;
}
