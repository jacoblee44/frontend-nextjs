import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { remove_ending_slash } from "@/utils/remove_ending_slash";
import { remove_starting_slash } from "@/utils/remove_starting_slash";
import { apiConfig } from "@/config";
import { AuthService } from "@/services/auth";

type RequestConfig = AxiosRequestConfig & {
  url: string;
  useBearerToken?: boolean;
};

const instance = axios.create({
  baseURL: `${remove_ending_slash(apiConfig?.root)}/`,
  timeout: 9000,
  headers: {
    "Content-Type": "application/json",
  },
});

function getInstance(options: RequestConfig): AxiosInstance {
  instance.interceptors.request.use(
    (config) => {
      try {
        if (config && config?.headers) {
          const token = new AuthService().getToken();

          if (
            (typeof options.useBearerToken === "undefined" ||
              options.useBearerToken) &&
            token
          ) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (e) {}

      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
}

const apiClient = {
  get(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .get(remove_starting_slash(options.url))
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  post(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);
    console.log(options);
    return instance
      .post(remove_starting_slash(options.url), options.data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  put(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .put(remove_starting_slash(options.url), options.data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  patch(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .patch(remove_starting_slash(options.url), options.data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  delete(options: RequestConfig) {
    const instance: AxiosInstance = getInstance(options);

    return instance
      .delete(remove_starting_slash(options.url))
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },
};

export { apiClient };
