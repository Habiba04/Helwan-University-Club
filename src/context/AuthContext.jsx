// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('token');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                sessionStorage.removeItem('token');
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem('token', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
