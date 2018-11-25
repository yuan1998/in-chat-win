import temp            from '../api/template'
import {mergeSetting} from "../utils/template";

const template = {
    namespaced: true ,
    state: {
        data : null,
    },
    getters: {
        getSetting ({data}) {
            return data && data.setting;
        },
        data({data}) {
            return data;
        }
    },
    mutations: {
        data (state , data) {
            state.data = data;
        },
    },
    actions: {
        async update({commit , rootGetters} , data) {
            const setting = rootGetters['setting/current']();
            let res = await temp.update(setting.id , data.id , data);

            if (res.status === 200) {
                commit('data' , res.data);
            }
            return res ;
        },
        async create({commit , rootGetters} , data) {
            console.log(rootGetters);
            const setting = rootGetters['setting/current']();
            let res = await temp.create(setting.id , data);

            if (res.status === 201) {
                commit('data' , res.data);
            }
            return res;
        },
        async show({commit , rootGetters} ) {
            const setting = rootGetters['setting/current']();
            let res = await temp.one(setting.id);
            if (res.status === 200) {
                res.data.setting  = mergeSetting(res.data.setting);
                commit('data' , res.data);
            }
            return res;
        }
    }
};

export default template;
