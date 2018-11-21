import axios                           from 'axios'
import {saveToken}                     from "../utils/assist";
import {clearAuthStorage } from "../utils/storage";
import {request , authRequest} from './request'

const login = async (params = {}) => {

    let authResponse = await request({
        url: 'auth' ,
        data: params ,
        method: 'POST'
    });

    if (authResponse.status === 201) {
        saveToken(authResponse.data.meta);
    }

    return authResponse;
};

const refreshToken = async (accessToken) => {

    let refreshResponse = await request({
        url: 'auth/current' ,
        method: 'PUT' ,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (refreshResponse.status === 200) {
        saveToken(refreshResponse.data);
    }

    return refreshResponse;
};

const logout = async () => {

    let response = await authRequest({
        url: 'auth/current' ,
        method: 'DELETE' ,
    });

    if (response.status === 204) {
        clearAuthStorage();
    }

    return response;
};

const current = async () => {
    return await authRequest('auth/current');
};

const signup = async (data) => {
    let res = await request({
        method: 'POST',
        data,
        url: 'user',
    });

    if (res.status === 201 ) {
        saveToken(res.data.meta);
    }

    return res;
};

export {
    login ,
    refreshToken ,
    logout,
    current,
    signup
}
