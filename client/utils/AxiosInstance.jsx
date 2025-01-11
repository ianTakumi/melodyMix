import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.100.78:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
