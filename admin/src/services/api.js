import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized errors
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                window.location.href = '/login';
            }
            // Return the error message from the server
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

// Banner API endpoints
export const bannerApi = {
    getAll: () => api.get('/banners'),
    getActive: () => api.get('/banners/active'),
    // Create a banner with image URL
    create: (payload) => api.post('/banners', payload),
    // Update a banner with image URL
    update: (id, payload) => api.put(`/banners/${id}`, payload),
    delete: (id) => api.delete(`/banners/${id}`)
  };

// Section API endpoints
export const sectionApi = {
    getAll: () => api.get('/sections'),
    getActive: () => api.get('/sections/active'),
    create: (payload) => api.post('/sections', payload),
    update: (id, payload) => api.put(`/sections/${id}`, payload),
    delete: (id) => api.delete(`/sections/${id}`)
};
  
export default api; 