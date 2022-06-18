import axios from 'axios';
import { apiInfo } from './Common'


export const getProjects = () => {
  return axios.get(apiInfo.baseUrl + "/project");
};
