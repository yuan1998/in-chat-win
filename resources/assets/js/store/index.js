import Vue      from 'vue'
import Vuex     from 'vuex'
import auth     from './auth'
import router   from './router'
import setting  from './setting'
import message  from './message'
import domain   from './domain'
import template from './template'
import logs     from './logs'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        router,
        setting,
        message,
        domain,
        template,
        logs,
    }
});

export default store;
