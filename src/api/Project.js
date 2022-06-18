import axios from "axios";
import { apiInfo } from "./Common";

export const getProjects = () => {
  return axios.get(apiInfo.baseUrl + "/project");
};

export const getProjectsByCategory = (category) => {
  return axios.get(apiInfo.baseUrl + "/project/category?category=" + category);
};

export const uploadProject = (project) => {
  return axios.post(apiInfo.baseUrl + "/project", project, {
    withCredentials: true,
  });
};
