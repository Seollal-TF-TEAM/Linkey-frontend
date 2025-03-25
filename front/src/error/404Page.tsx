import React from 'react';
import { Button } from "@mantine/core";
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - 페이지를 찾을 수 없습니다</h1>
            <p>요청하신 페이지가 존재하지 않습니다.</p>
            <Button
                variant="light"
                color="#545454"
                onClick={() => navigate('/')}
            >
                홈으로 돌아가기
            </Button>
        </div>
    );
};

export default NotFoundPage;