import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as authLogin, logout as authLogout, getCurrentAdmin } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = React.memo(({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentAdmin = getCurrentAdmin();
        setAdmin(currentAdmin);
        setLoading(false);
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            const data = await authLogin(email, password);
            setAdmin(data.admin);
            return data;
        } catch (error) {
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        authLogout();
        setAdmin(null);
    }, []);

    const value = React.useMemo(() => ({
        admin,
        login,
        logout,
        loading
    }), [admin, login, logout, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 