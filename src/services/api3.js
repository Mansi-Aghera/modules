import axios from "axios";

const api = axios.create({
  baseURL: "https://adminapi.digiteachindia.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
