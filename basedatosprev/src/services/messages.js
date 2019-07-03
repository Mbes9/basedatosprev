import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000
});

export const getMessages = () => {
  return api.get("/Messages");
};


export const getCache = () => {
  return api.get("/Cache");
};