/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue       from 'vue'
import VueRouter from 'vue-router'
import routes    from './routes'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue'
import store from './store'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
    routes
});

Vue.config.productionTip = false;


const whiteList = [
    '/login',
    '/welcome',
    '/404',
];

router.beforeEach( async (to, from , next) => {
    let user = store.getters['auth/gerUserInfo'] || await store.dispatch('auth/checkToken');

    if( user ) {
        if (!store.getters['router/getAdded']) {
            router.addRoutes(store.getters['router/asyncRouterMap']);
            store.commit('router/addRouterOver');
            next({ ...to , replace:true});
        }

        if (to.path === '/login') {
            next('/welcome');
        }
        else {
            next();
        }
    }
    else {
        if (whiteList.includes(to.path)) {
            next();
        }else {
            next('/login');
        }
    }


});

const app = new Vue({
    el: '#app' ,
    router,
    store,
    render: h => h(App)
});

export default app;
