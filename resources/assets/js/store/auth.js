import {login , logout , authRequest , getToken } from "../api/auth";

const auth = {
    namespaced: true ,
    state: {
        user: null
    } ,
    getters: {
        userIsLogin: state => {
            return !!state.user;
        } ,
        gerUserInfo: state => {
            return state.user;
        }
    } ,
    mutations: {
        saveUser (state , user) {
            state.user = user;
        } ,
        clearUser (state) {
            state.user = null;
        }
    } ,
    actions: {
        async login ({commit} , form) {
            let res = await login(form);

            if (res.status !== 201) {
                return false;
            }
            commit('saveUser' , res.data);
            return res.data;
        } ,
        async logout ({commit} , form) {
            if (!getters.user) {
                return false;
            }

            let res = await logout();

            commit('clearUser');

            return (res.status === 204);
        } ,
        async show ({commit}) {
            let res = await authRequest('auth/current');

            if (res.status !== 200) {
                return false;
            }

            commit('saveUser' , res.data);
            return res.data;
        },
        async checkToken({commit , dispatch}) {
            let token = await getToken();

            if (token === null)
                return false;

            return await dispatch('show');
        }
    }
};

export default auth;
