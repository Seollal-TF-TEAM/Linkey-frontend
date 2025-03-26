import React from 'react';
import { Text } from '@mantine/core';
import {useParams} from "react-router-dom";
// @ts-ignore
import SprintPreviewComponent from "../../project/[projectId]/Components/SprintPreviewPage.tsx";

function SprintPage() {
    const {sprintId} = useParams();

    return (<>
        <Text>Hi sprint {sprintId}</Text>

    </>);
}
export default SprintPage;