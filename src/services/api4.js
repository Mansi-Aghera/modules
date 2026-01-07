import axios from "axios";

const api = axios.create({
  baseURL: "https://codingcloud.pythonanywhere.com",
});

export default api;
