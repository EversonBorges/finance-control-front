import axios from "axios";

const apiFetch = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers:{
        "Content-Type": "application/json"
    },
    //timeout: 10000
})

export default apiFetch