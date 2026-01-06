import axios from "axios";

const homeIpAdd = "192.168.100.8";

const axiosInstance = axios.create({
  baseURL: `http://${homeIpAdd}:4000/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
