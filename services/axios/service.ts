import axios, { AxiosError, AxiosHeaderValue, AxiosResponse } from "axios";

if (!process.env.BASE_URL) throw { message: "Server URL is not specified" };
if (!process.env.STABLE_VERSION) throw { message: "Application Version is undefined" };

const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL,
});

// return service.interceptors.request.use((config) => {
//   config.headers.Cookie = cookie;
//   return config;
// });

function setServiceCookie(cookies: any) {
  // service.defaults.headers["Cookie"] = cookies as never as AxiosHeaderValue;
  service.defaults.headers["Cookie"] = cookies as never as AxiosHeaderValue;
}

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError<NonPaginatedResponse<any>>) => {
    if (error.code === "ECONNABORTED" /* Timeout or connection aborted */) {
      return Promise.resolve({ data: null, success: false, message: "Request timed out" });
    }

    if (!error.response /* No response (e.g., server unreachable, CORS issues, or offline) */) {
      return Promise.resolve({ data: null, success: false, message: "Network connectivity issue" });
    }

    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      return Promise.resolve({ data: null, success: false, message: "Unable to connect to the internet. Please check your internet connection and try again." });
    }

    // ? We want to minimize the use of the .catch resulting from errored APIs so we choose not to Promise.reject other errors
    if (error?.response?.data) {
      const { data, message } = error.response.data;
      return Promise.resolve({ data: data ?? null, success: false, message: message ?? "Something went wrong" });
    } else {
      return Promise.resolve({ data: null, success: false, message: "No response" });
    }
  }
);

export { service as default, setServiceCookie };
