import axios, { AxiosError, AxiosResponse } from "axios";

if (!process.env.BASE_URL) throw { message: "Server URL is not specified" };
if (!process.env.STABLE_VERSION) throw { message: "Application Version is undefined" };

const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL,
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // return service.interceptors.request.use((config) => {
    //   config.headers.Cookie = cookie;
    //   return config;
    // });

    return response.data;

    // return Promise.resolve(error.response.data || error); // we want to minimize the use of the .catch resulting from errored APIs so we choose not to Promise.reject other errors
  },
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED" /* Timeout or connection aborted */) {
      return Promise.reject({ data: null, success: false, message: "Request timed out" });
    }

    if (!error.response /* No response (e.g., server unreachable, CORS issues, or offline) */) {
      return Promise.reject({ data: null, success: false, message: "Network connectivity issue" });
    }

    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      return Promise.reject({ data: null, success: false, message: "Unable to connect to the internet. Please check your internet connection and try again." });
    }

    return Promise.reject(error.response.data || error);
  }
);

export { service as default };
