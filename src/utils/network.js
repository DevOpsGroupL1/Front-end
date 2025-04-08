import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./constants";


const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options) => {
  let token = "";
  token = Cookies.get("token");
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const onSuccess = (response) => {
    return response?.data?.data;
  };

  const onError = (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};
