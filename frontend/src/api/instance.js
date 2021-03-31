import axios from "axios";

const instance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"
    },
    baseURL: "https://nodeapptest.vercel.app/",
    
})

export default instance;