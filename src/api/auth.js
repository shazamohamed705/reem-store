import axios from "axios";

const api = axios.create({
  baseURL: "https://mezna-store.com/backend/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// تسجيل مستخدم جديد
export const register = (data) => api.post("/auth/register", data);

// تسجيل دخول
export const login = (data) => api.post("/auth/login", data);

// إعداد Authorization header تلقائيًا
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

