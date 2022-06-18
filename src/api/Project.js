import axios from "axios";
import { apiInfo } from "./Common";

export const getProjects = () => {
  return axios.get(apiInfo.baseUrl + "/project");
};

export const getProjectsByCategory = (category) => {
  return axios.get(apiInfo.baseUrl + "/project/category?category=" + category);
};

export const getProjectById = (id) => {
  return axios.get(apiInfo.baseUrl + "/project/" + id);
};

export const searchProjectByTitle = (keyword) => {
  return axios.get(apiInfo.baseUrl + "/project/search?keyword=" + keyword);
};

export const uploadProject = (project) => {
  return axios.post(apiInfo.baseUrl + "/project", project, {
    withCredentials: true,
  });
};

export const editProject = (id, project) => {
  return axios.patch(apiInfo.baseUrl + `/project/${id}`, project, {
    withCredentials: true,
  });
};

export const editProjectState = (id, state) => {
  return axios.patch(
    apiInfo.baseUrl + `/project/state/${id}`,
    { state: state },
    {
      withCredentials: true,
    }
  );
};

export const deleteProject = (id) => {
  return axios.delete(apiInfo.baseUrl + `/project/${id}`, {
    withCredentials: true,
  });
};
