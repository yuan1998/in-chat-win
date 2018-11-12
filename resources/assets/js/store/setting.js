import {params}       from "../utils/assist";
import {mergeSetting} from "../utils/setting";
import Setting        from '../api/setting';

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
        async getList ({commit}) {

            let res = await Setting.index();
            console.log(res);

            if (res.status === 200) {
                commit('list' , res.data.data);
            }

            return res;
        } ,
        async settingShow ({commit , getters} , id) {
            let item = getters['idOf'](id);
            if (item) {
                commit('current' , mergeSetting(item));
                return {
                    status: 200 ,
                    data: getters['current']()
                };
            }

            let res = await Setting.show(id);

            if (res.status === 200) {
                commit('current' , mergeSetting(res.data));
            }
            return res;
        } ,
        async update ({state , commit , getters} , data) {
            let id = data.id;

            let res = await Setting.update(id , data);

            if (res.status === 200) {
                commit('current' , res.data);
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

            return await dispatch('update' , data);
        }
    }
};

export default setting;
