import axios from "axios";

export const localServerURL = "http://api.bestrunner.localhost/workout/";
export const vercelServerURL = "https://bestrunnerapp.vercel.app/workout/";

export const getHeader = (headers: Headers) => {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  return headers;
}