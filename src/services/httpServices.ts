import axios, { InternalAxiosRequestConfig } from "axios";
import { UserType } from "./authServices";
const BASE_URL = "http://localhost:5500/api";

interface ReturnRefreshToken {
  statusCode: number;
  data: {
    user:UserType;
  };
}
const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

app.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (axios.isAxiosError(err)) {
      const originalConfig = err.config as InternalAxiosRequestConfig &  { _retry?: boolean } | undefined;
      if (err.response?.status === 401 &&  originalConfig && !originalConfig?._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await axios.get<ReturnRefreshToken>(`${BASE_URL}/user/refresh-token`,{withCredentials:true});
          if (data) return app(originalConfig);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  delete: app.delete,
  path: app.patch,
};

export default http;
