import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Banner API endpoints
export const getBanners = () => api.get("/banners/active");
// Section API endpoints
export const getSections = () => api.get("/sections/active");

export default api;
