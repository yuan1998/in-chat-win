import {login , logout , current , signup} from "../api/auth";
import {getToken}                          from "../api/request";

const auth = {
    namespaced: true ,
    state: {
        user: null
    } ,
    getters: {
        userIsLogin({user}) {
            return !!user;
        } ,
        gerUserInfo({user}) {
            return user;
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
        async signup({commit} , form) {
            let res = await signup(form);

            if (res.status === 201) {
                commit('saveUser' , res.data);
            }

            return res ;
        },
        async login ({commit} , form) {
            let res = await login(form);
            if (res.status !== 201) {
                return res;
            }
            commit('saveUser' , res.data);
            return true;
        } ,
        async logout ({commit, state}) {
            if (!state.user) {
                return false;
            }

            let res = await logout();

            if ( res.status === 204){
                commit('clearUser');
            }

            return res;
        } ,
        async show ({commit}) {
            let res = await current();

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
            let result = await dispatch('show');
            return result;
        }
    }
};

export default auth;
