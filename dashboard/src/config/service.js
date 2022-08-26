import axios from "axios";

const service = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default service;
