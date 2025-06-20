import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:7183/",
    timeout: 10000
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})


export default api;
