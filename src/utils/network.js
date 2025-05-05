import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./constants";
import { store } from "../redux/store";
import { setCurrentUser } from "../redux/reducers/authSlice";


const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(setCurrentUser(null));
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export const request = async (options) => {
  let token = "";
  token = Cookies.get("token");



  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const onSuccess = (response) => {
    console.log("response", response);
    return response?.data?.data;
  };

  const onError = (error) => {
    console.error("Request error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};

