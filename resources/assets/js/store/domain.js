import Domain from '../api/domain'
const domain = {
    namespaced: true,
    state: {
        domains : null,
        current : null,
    },
    getters: {
        domains({domains}) {
            return domains;
        },
        current: ({current}) => (id) => {
            return (current && current.id === id ) || (!id)
                ? current
                : false;
        },
        idOf: ({domains}) => (id) => {
            return domains && domains.findIndex(item => item.id == id);
        },
        idOfItem: ({domains}) => (id) => {
            return domains && domains.find(item => item.id == id);
        },
        domainInSetting: ({domains}) => (id) => {
            return domains && domains.filter( item => item.setting_id === id);
        }
    },
    mutations: {
        current({state} , data) {
            state.current = data;
        },
        domains({state} , data) {
            state.domains = data;
        },
        create({state} , data) {
            state.domains.push(data);
        },
        update({state} , {data , index}) {
            state.splice(index , 1 ,data);
        },
        destroy({state} , index) {
            state.splice(index , 1)
        }

    },
    actions : {
        async create ({ commit , rootGetters } , data) {
            let setting = rootGetters['setting/current']();

            if (!setting) {
                return false;
            }

            data.setting_id = setting.id;
            let res = await Domain.create(data);

            if (res.status === 200) {
                commit('create',res.data);
            }

            return res;
        },
        async update ( { commit , getters } , data ) {

            let id = data.id;
            let res = await Domain.update( id , data);

            if (res.status === 200) {
                let index = getters['idOf'](id);
                index !== -1 && commit('update' , {index , data: res.data});
            }

            return res;
        },
        async destroy ({commit , getters } , id) {
            let res = await Domain.destroy(id);

            if (res.status === 200) {
                let index = getters['idOf'](id);
                index !== -1 && commit('destroy' , index);
            }

            return res;
        },
        async index({commit}) {
            let res = await Domain.index();

            if(res.status === 200) {
                commit('domains', res.data.data);
            }
            return res;
        },
        async show({commit , getters} , id) {
            let item = getters['idOfItem'](id);

            if(item) {
                return item;
            }

            let res = await Domain.show(id);

            if(res.status === 200) {
                commit('create' , res.data);
                return res.data;
            }

            return null;
        },
    }
};

export default domain;
