import axios                            from "axios/index";
import { clearAuthStorage, getStorage } from "../utils/storage";
import { refreshToken }                 from "./auth";
import { saveToken }                    from "../utils/assist";
import app                              from '../app.js'

const { MIX_API_URL, MIX_TOKEN_NAME } = process.env;

const request = async (options) => {
    if (typeof options === 'stirng') {
        options = {
            url: options
        }
    }
    options.url = MIX_API_URL + options.url;

    let response;
    try {
        response = await axios(options);
    } catch (e) {
        if (e.response) {
            response = e.response;
        } else {
            throw new Error(e);
        }
    }
    return response;
};

const getToken = async () => {
    let token     = getStorage(MIX_TOKEN_NAME);
    let now       = new Date().getTime();
    let expiredAt = getStorage(MIX_TOKEN_NAME + '_expired_at');

    if (token && expiredAt) {
        let twentyMin = 20 * 60 * 1000;
        let less      = expiredAt - twentyMin;

        if (now > less) {
            let tokenResponse = await refreshToken(token);

            if (tokenResponse.status === 200) {
                token = tokenResponse.data.access_token;
                saveToken(tokenResponse.data);
            } else {
                token = null;
                clearAuthStorage();
            }
        }
    }
    else {
        token = null;
        clearAuthStorage();
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
        app.$notify.error({
            title  : '错误',
            message: '登录超时.请重新登录.'
        });
        app.$store.commit('auth/clearUser');
        app.$router.push('/login');
        return false;
    }

    let headers           = options.headers || {};
    headers.Authorization = 'Bearer ' + token;
    options.headers       = headers;

    return await request(options);
};

export {
    authRequest,
    request,
    getToken
}
