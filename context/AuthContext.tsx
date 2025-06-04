"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    userId: string | null;
    handleLogin: (token: string, userId: string) => void;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    initialToken?: string | null;
    initialUserId?: string | null;
}

export const AuthProvider = ({ children, initialToken, initialUserId }: AuthProviderProps) => {
    // State
    const [token, setToken] = useState<string | null>(initialToken ?? null);
    const [userId, setUserId] = useState<string | null>(initialUserId ?? null);

    // Effect
    useEffect(() => {
        const storedToken = Cookies.get('authToken');
        const storedUserId = Cookies.get('userId');
        if ((storedToken && storedToken !== token) || (storedUserId && storedUserId !== userId)) {
            setToken(storedToken ?? null);
            setUserId(storedUserId ?? null);
        } else if (!storedToken && (token || userId)) {
            handleLogout();
        }
    }, [token, userId]);

    // Handler
    const handleLogin = (newToken: string, newUserId: string) => {
        Cookies.set('authToken', newToken, { expires: 7 });
        Cookies.set('userId', newUserId, { expires: 7 });
        setToken(newToken);
        setUserId(newUserId);
    };
    const handleLogout = () => {
        Cookies.remove('authToken');
        Cookies.remove('userId');
        setToken(null);
        setUserId(null);
    };
    return (
        <AuthContext.Provider value={{ token, userId, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 