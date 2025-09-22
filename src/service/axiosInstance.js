import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080", // tu URL base
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar el token en cada request
/*
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken"); // o sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
});
*/

export default api;