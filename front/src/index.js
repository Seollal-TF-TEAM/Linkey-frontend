import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {DatesProvider} from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <DatesProvider settings={{ locale: "ko" }}>
                <App />
            </DatesProvider>
        </MantineProvider>
    </React.StrictMode>
);
