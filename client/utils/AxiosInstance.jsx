import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.34.17.250:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
