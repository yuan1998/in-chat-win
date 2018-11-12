import Message from '../api/message'

const message = {
    namespaced: true ,
    state: {
        current: null ,
        message: null ,
    } ,
    getters: {
        current: ({current}) => (id) => {
            return current == id;
        } ,
        message ({message}) {
            return message;
        } ,
        nameExists: ({message}) => (name , id) => {
            if (!message) {
                return false;
            }
            else {
                return message.findIndex(item => item.id !== id && item.keyword.toLowerCase() === name.toLowerCase()) !== -1;
            }
        }
    } ,
    mutations: {
        current (state , id) {
            state.current = id;
        } ,
        message (state , data) {
            state.message = data;
        } ,
        addMessage (state , item) {
            state.message.push(item);
        } ,
        removeMessage (state , id) {
            let index = state.message && state.message.findIndex(item => item.id === id);
            index !== -1 && state.message.splice(index , 1);
        } ,
        changeMessage (state , data) {
            let index = state.message && state.message.findIndex(item => item.id === data.id);
            index !== -1 && state.message.splice(index , 1 , data);
        }
    } ,
    actions: {
        async current ({commit} , id) {
            let res = await Message.index(id);

            if (res.status === 200) {
                commit('current' , id);
                commit('message' , res.data.data);
            } else {
                this._vm.$notify({
                    title: '错误' ,
                    message: '发生错误,联系管理员:' ,
                    type: 'error'
                });
            }

            return res;
        } ,
        async store ({state , commit} , data) {
            let id = state.current;
            if (!id) {
                return false;
            }

            data.setting_id = id;

            let res = await Message.create(data);
            if (res.status === 200) {
                commit('addMessage' , res.data);
            }

            return res;
        } ,
        async update ({state , commit} , {id , data}) {

            let res = await Message.update(id,data);

            if (res.status === 200) {
                commit('changeMessage' , res.data);
            }

            return res;
        } ,
        async destroy ({commit} , id) {
            let res = await Message.destroy(id);

            if (res.status === 204) {
                commit('removeMessage' , id);
            } else {
                this._vm.$notify({
                    title: '错误' ,
                    message: '发送错误,联系管理员' ,
                    type: 'error'
                });
            }

            return res;
        }

    }
};

export default message;
