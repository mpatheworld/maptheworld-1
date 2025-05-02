import api from './api';

export const login = async (email, password) => {
    const response = await api.post('/admin/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
};

export const getCurrentAdmin = () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}; 