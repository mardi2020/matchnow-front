import axios from "axios";
import { apiInfo } from "./Common";

export const getCommentByProjectId = (id) => {
  return axios.get(apiInfo.baseUrl + "/comment/" + id);
};

export const uploadComment = (comment) => {
  return axios.post(apiInfo.baseUrl + "/comment", comment, {
    withCredentials: true,
  });
};

export const deleteComment = (id) => {
  return axios.delete(apiInfo.baseUrl + `/comment/${id}`, {
    withCredentials: true,
  });
};
