import Message from '../api/message'

const defaultMessage = (item) => {
    return {
        ...item ,
        modelShow: false ,
        deleting: false ,
    };
};

const messageList = (arr) => {
    return arr.map(item => {
        return defaultMessage(item);
    })
};

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
        } ,
        indexOf: ({message}) => (id) => {
            return message && message.findIndex(item => item.id == id);
        }
    } ,
    mutations: {
        current (state , id) {
            state.current = id;
        } ,
        message (state , data) {
            state.message = messageList(data);
        } ,
        addMessage (state , item) {
            state.message.push(defaultMessage(item));
        } ,
        removeMessage (state , index) {
            index !== -1 && state.message.splice(index , 1);
        } ,
        changeMessage (state , {data , index}) {
            index !== -1 && state.message.splice(index , 1 , defaultMessage(data));
        }
    } ,
    actions: {
        async current ({commit} , id) {
            let res = await Message.index(id);

            if (res.status === 200) {
                commit('current' , id);
                commit('message' , res.data.data);
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
        async update ({state , commit , getters} , data) {
            let id = data.id;
            let res = await Message.update(id , data);

            if (res.status === 200) {
                let index = getters['indexOf'](id);
                commit('changeMessage' , {data: res.data , index});
            }

            return res;
        } ,
        async destroy ({commit} , id) {
            let res = await Message.destroy(id);

            if (res.status === 204) {
                let index = getters['indexOf'](id);
                commit('removeMessage' , index);
            }

            return res;
        }

    }
};

export default message;
