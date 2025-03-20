import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <html>
        <body>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <App/>
            </MantineProvider>
        </body>
    </html>
);