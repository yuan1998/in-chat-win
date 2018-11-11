import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import router from './router'
import setting from './setting'
import message from './message'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        auth,
        router,
        setting,
        message
    }
});

export default store;
