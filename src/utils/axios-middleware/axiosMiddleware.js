import axios from "axios";
import Cookies from "js-cookie";

const attachTokenMiddleware = (config) => {
  let authToken = Cookies.get("authToken") || localStorage.getItem("authToken"); // 🔥 Fallback

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(attachTokenMiddleware, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
