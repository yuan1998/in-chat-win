import api from '../api/logs';

const logs = {
    namespaced: true,
    state    : {
        data      : null,
        pagination: null,
        current   : 1,
        pageCount : 20,
        where     : null
    },
    mutations: {
        data(state, data) {
            state.data = data;
        },
        pagination(state, pagination) {
            state.pagination = pagination;
        },
        current(state, page) {
            state.current = page;
        },
        pageCount(state,count) {
            state.pageCount = count;
        },
        where(state, where) {
            state.where = where;
        }
    },
    getters  : {
        data({ data }) {
            return data;
        },
        pagination({ pagination }) {
            return pagination;
        },
        current({ current }) {
            return current;
        },
        where({ where }) {
            return where;
        }
    },
    actions  : {
        async data({ commit, state }) {
            let data = {
                page: state.current,
                paginate: state.pageCount
            };

            let res  = await api.index(data);

            if (res.status === 200) {
                commit('data', res.data.data);
                commit('pagination', res.data.meta.pagination);
            }
            return res;
        },
        async destroy({commit} , id) {
            let res  = await api.destroy(id);
            return res;
        },
        setWhere({ commit }, where) {
            commit('where', where);
            return true;
        },
    },


};

export default logs;
