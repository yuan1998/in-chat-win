import {authRequest} from "../api/auth";

const message = {
    namespaced: true,
    state: {
        current: null,
        message: null,
    },
    getters: {
        current:({current}) => (id) => {
            return current == id;
        },
        message({message}) {
            return message;
        },
        nameExists:({message}) => (name , id) => {
            if (!message) {
                return false;
            }
            else {
                return message.findIndex(item => item.id !== id && item.keyword.toLowerCase() === name.toLowerCase()) !== -1;
            }
        }
    },
    mutations: {
        current(state , id) {
            state.current = id;
        },
        message(state , data) {
            state.message = data;
        },
        addMessage(state , item) {
            state.message.push(item);
        },
        removeMessage(state , id) {
            let index = state.message && state.message.findIndex( item => item.id === id);
            index !== -1 && state.message.splice(index , 1);
        },
        changeMessage(state , data) {
            let index = state.message && state.message.findIndex( item => item.id === data.id);
            index !== -1 && state.message.splice(index , 1 , data);
        }
    },
    actions: {
        async current({commit},id) {
            let url = 'setting/'+id + '/message';
            let res = await authRequest(url);

            if (res.status === 200) {
                commit('current',id);
                commit('message',res.data.data);
            }else {
                this._vm.$notify({
                    title: '错误',
                    message: '发生错误,联系管理员:',
                    type: 'error'
                });
            }

            return res;
        },
        async store({ state , commit}, data) {
            let id = state.current ;
            if(!id) {
                return false;
            }

            data.setting_id = id;
            let options = {
                data,
                url : 'message',
                method: "POST",
            };

            let res = await authRequest(options);
            if (res.status === 200) {
                commit('addMessage',res.data);
            }

            return res;
        },
        async update({ state , commit}, { id , data}) {
            let setting_id = state.current;
            if(!setting_id) {
                return false;
            }

            data.setting_id = setting_id;
            let options = {
                data,
                url : 'message/' + id,
                method: "PATCH",
            };

            let res = await authRequest(options);
            if (res.status === 200) {
                commit('changeMessage',res.data);
            }

            return res;
        },

        async destroy({commit},id) {
            let url = 'message/' + id ;
            let options = {
                url,
                method: 'DELETE'
            };

            let res = await authRequest(options);

            if(res.status === 204) {
                commit('removeMessage' , id);
            }else {
                this._vm.$notify({
                    title: '错误',
                    message: '发送错误,联系管理员',
                    type: 'error'
                });
            }

            return res;
        }

    }
};

export default message;
