import axios from "axios";

const localServerURL = "http://localhost:5000/workout/";
const vercelServerURL = "https://bestrunnerapp.vercel.app/workout/";

const instance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"
    },
    baseURL: localServerURL,
})

export default instance;