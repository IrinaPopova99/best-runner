import axios from "axios";

export const localServerURL = "http://api.bestrunner.localhost/";
export const vercelServerURL = "https://bestrunnerapp.vercel.app/workout/";

export const getHeader = (headers: Headers) => {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  headers.set('Content-Type', 'application/json');
  return headers;
}