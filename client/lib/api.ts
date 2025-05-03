import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Banner API endpoints
export const getBanners = () => api.get("/banners/active");
// Section API endpoints
export const getSections = () => api.get("/sections/active");

export default api;
