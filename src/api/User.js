import axios from 'axios'
import { apiInfo } from './Common'


export const register = (email, password, username) => {
    return axios.post(apiInfo.baseUrl + '/register', {
        email,
        password,
        username,
    })
}

export const login = (email, password) => {
    return axios.post(apiInfo.baseUrl + '/login', {
        email,
        password,
    }, { withCredentials: true })
}

export const logout = () => {
    return axios.post(apiInfo.baseUrl + '/logout',
    {},
    { withCredentials: true })
}

export const getMyInfo = () => {
    return axios.get(apiInfo.baseUrl + '/me', { withCredentials: true })
}