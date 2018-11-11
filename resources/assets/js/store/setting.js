import {authRequest}  from "../api/auth";
import {params}       from "../utils/assist";
import {mergeSetting} from "../utils/setting";

const setting = {
    namespaced: true ,
    state: {
        list: null ,
        pagination: null ,
        page: 1 ,
        paginate: 20 ,
        include: [] ,
        current: null ,
    } ,
    getters: {
        getParams ({page , paginate , include}) {
            return {
                page ,
                paginate ,
                include
            }
        } ,
        list ({list}) {
            return list;
        } ,
        pagination ({pagination}) {
            return pagination;
        } ,
        current: ({current}) => (id) => {
            console.log(current ,id);
            return (current && current.id == id) || (id === undefined)
                ? current
                : false;
        } ,
        idOf: ({list}) => (id) => {
            let item = list && list.find(each => each.id == id);

            return item;
        } ,
        listIndex: ({list}) => (id) => {
            return list.findIndex(item => item.id === id);
        }
    } ,
    mutations: {
        current (state , data) {
            state.current = data;
        } ,
        list (state , data) {
            state.list = data;
        } ,
        pagination (state , data) {
            state.pagination = data;
        } ,
        listReplace (state , {data , index}) {
            state.list.splice(index , 1 , data);
        }
    } ,
    actions: {
        async getList ({commit , getters} , p = {}) {
            p = {
                ...getters['getParameter'] ,
                ...p
            };
            let url = 'setting?' + params(p);

            let res = await authRequest(url);

            if (res.status !== 200) {
                return false;
            }

            commit('list' , res.data.data);
            commit('pagination' , res.data.meta.pagination);

            return res;
        } ,
        async settingShow ({ commit , getters} , id) {
            let item = getters['idOf'](id);
            if (item) {
                commit('current' , mergeSetting(item));
                return {
                    status: 200,
                    data: getters['current']()
                };
            }

            let url = 'setting/' + id;
            let res = await authRequest(url);

            if (res.status === 200) {
                commit('current' , mergeSetting(res.data));
            }
            return res;
        } ,
        async update ({state , commit , getters} , data) {
            let id = data.id;
            let url = 'setting/' + id;

            let res = await authRequest({
                url ,
                data ,
                method: "PATCH" ,
            });

            if (res.status !== 200) {
                return false;
            }

            id = res.data.id;

            if (state.current && state.current.id === id) {
                commit('current' , res.data);
            }

            if (state.list) {
                let index = getters['listIndex'](id);
                index !== -1 && commit('listReplace' , {index , data: res.data});
            }

            return res;
        } ,
        async setDefault ({state , dispatch , commit} , id) {
            let data = {
                id: state.current.id ,
                default_message: id ,
            };

            return await dispatch('update', data);
        }
    }
};

export default setting;
