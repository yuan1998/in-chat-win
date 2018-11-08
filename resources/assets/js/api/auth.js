import axios                           from 'axios'
import {apiUrl , tokenName}            from '../utils/config';
import {saveToken}                     from "../utils/assist";
import {clearAuthStorage , getStorage} from "../utils/storage";

const request = async (options) => {

    if (typeof options === 'stirng') {
        options = {
            url: options
        }
    }
    options.url = apiUrl + options.url;

    let response = await axios(options);

    return response;
};

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

const getToken = async () => {

    let token = getStorage(tokenName);
    let expiredAt = getStorage(tokenName + '_expired_at');

    if (token && new Date().getTime() > expiredAt) {
        let tokenResponse = await refreshToken(token);

        if (tokenResponse.status === 200) {
            token = tokenResponse.data.access_token;
            saveToken(tokenResponse.data);
        } else {
            token = null;
        }
    }

    return token;
};

const authRequest = async (options) => {
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }

    let token = await getToken();

    if (!token) {
        return false;
    }

    let headers = options.headers || {};
    headers.Authorization = 'Bearer ' + token;
    options.headers = headers;

    return await request(options);
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

export {
    login ,
    request ,
    authRequest ,
    refreshToken ,
    logout,
    getToken,
}
