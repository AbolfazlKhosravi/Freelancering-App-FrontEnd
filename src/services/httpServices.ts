import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:5500/api",
  withCredentials: true,
});

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  delete: app.delete,
  path: app.patch,
};

export default http