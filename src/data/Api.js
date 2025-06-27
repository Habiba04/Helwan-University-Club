import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7016/api/",
    timeout: 10000
})

api.interceptors.request.use(config => {
    if (sessionStorage.getItem("token") == null) {
        console.log("no token");
        return config;
    }
    // console.log(sessionStorage.getItem("token"))
    config.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem("token"))?.token}`
    return config
})


export default api;
