// src/context/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'ar');

    const changeLanguage = (lang) => {
        localStorage.setItem('lang', lang);
        setLanguage(lang); // trigger re-renders
    };

    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'lang') {
                setLanguage(e.newValue);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
