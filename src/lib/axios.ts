import axios from "axios";

const axiosInterceptorInstance = axios.create({
  baseURL: "https://wallet.silkinv.com/api",
  headers: {
    Accept: "application/json",
    "App-Authorizer": 647061697361,
  },
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token") as string;
    if (accessToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
export { axiosInterceptorInstance as api };
