import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL; // 실제 Spring Boot 서버 주소
const BACKEND_URL = process.env.REACT_APP_BACKEND_URI!;



//team

//sprint


//project

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


//user login

export function checkGithubUserExists(userId: string) {
    return axios.get(`${BASE_URL}/auth/github/exists/${userId}`);
}

export function getGithubUserIdByCode(code: string) {
    return axios.get(`${BACKEND_URL}?code=${code}`);
}