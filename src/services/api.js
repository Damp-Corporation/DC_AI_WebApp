import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // ou autre URL backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
