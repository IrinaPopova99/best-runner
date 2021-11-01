import axios from "axios";

export const localServerURL = "http://localhost:5000/workout/";
export const vercelServerURL = "https://bestrunnerapp.vercel.app/workout/";
export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
};

export const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
  },
  baseURL: localServerURL,
});
