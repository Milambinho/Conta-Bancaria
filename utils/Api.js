import axios from "axios";

const api = axios.create({
    baseURL: "https://630914d0f8a20183f76e57c7.mockapi.io/",
});

export default api;