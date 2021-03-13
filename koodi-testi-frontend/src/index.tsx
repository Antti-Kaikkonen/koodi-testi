import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Container, CssBaseline } from '@material-ui/core';

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <Container maxWidth="sm" className="center">
            <App />
        </Container>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
