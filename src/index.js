import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';


import { BrowserRouter, } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageProvider.context';
import ScrollToHashElement from './router/ScrollToHashElement.js';
import { AuthProvider } from './context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LanguageProvider>
            <BrowserRouter>
                <ScrollToHashElement />
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </LanguageProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
