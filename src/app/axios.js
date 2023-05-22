import axios from "axios";
import SecureLS from "secure-ls";

let API_ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT_DEV;
} else {
  API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT_PRD;
}

const ls = new SecureLS({ encodingType: "aes" });

export const cbxAxios = axios.create({
  baseURL: API_ENDPOINT,
});

cbxAxios.interceptors.request.use(
  (config) => {
    const token = ls.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);