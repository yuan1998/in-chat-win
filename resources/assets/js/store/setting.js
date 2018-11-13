import Setting        from '../api/setting';

const defaultSetting = (item) => {
    return {
        ...item ,
        modelShow: false ,
        deleting: false ,
    };
};

const settingList = (arr) => {
    return arr.map(item => {
        return defaultSetting(item);
    })
};

const setting = {
    namespaced: true ,
    state: {
        list: null ,
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
            state.current = defaultSetting(data);
        } ,
        list (state , data) {
            state.list = settingList(data);
        } ,
        listReplace (state , {data , index}) {
            state.list.splice(index , 1 , defaultSetting(data));
        } ,
        addItem (state , data) {
            state.list.push(defaultSetting(data));
        },
        removeItem (state , index) {
            state.list.splice(index , 1 );
        }
    } ,
    actions: {
        async getList ({commit}) {
            let res = await Setting.index();

            if (res.status === 200) {
                commit('list' , res.data.data);
            }

            return res;
        } ,
        async settingShow ({commit , getters} , id) {
            let item = getters['idOf'](id);
            if (item) {
                commit('current' , item);
                return {
                    status: 200 ,
                    data: getters['current']()
                };
            }

            let res = await Setting.show(id);

            if (res.status === 200) {
                commit('current' , res.data);
            }
            return res;
        } ,
        async create ({state , commit} , data) {
            let res = await Setting.create(data);

            if (res.status === 200) {
                commit('addItem' , res.data);
            }

            return res;
        } ,
        async destroy ({ commit , getters } , id)
        {
            let res = await Setting.destroy(id);

            if (res.status === 204) {
                let index = getters['listIndex'](id);
                commit('removeItem' , index);
            }

            return res;
        },
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
