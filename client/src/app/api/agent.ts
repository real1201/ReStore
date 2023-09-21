import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../features/routes/Routes";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelErrors.push(data.errors[key]);
            }
          }
          throw modelErrors.flat();
        }
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => request.get("products"),
  details: (id: string) => request.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => request.get("error/bad-request"),
  get404Error: () => request.get("error/not-found"),
  get401Error: () => request.get("error/unauthorized"),
  get500Error: () => request.get("error/server-error"),
  getValidationError: () => request.get("error/validation-error"),
};

const agent = {
  Catalog,
  TestErrors,
};
export default agent;
