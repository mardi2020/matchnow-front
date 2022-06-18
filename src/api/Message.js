import axios from "axios";
import { apiInfo } from "./Common";

export const getSendMessage = () => {
  return axios.get(apiInfo.baseUrl + "/message/send", {
    withCredentials: true,
  });
};

export const getRecvMessage = () => {
  return axios.get(apiInfo.baseUrl + "/message/recv", {
    withCredentials: true,
  });
};

export const sendMessage = (message) => {
  return axios.post(apiInfo.baseUrl + "/message", message, {
    withCredentials: true,
  });
};

export const deleteMessage = (id) => {
  return axios.delete(apiInfo.baseUrl + `/message/${id}`, {
    withCredentials: true,
  });
};
