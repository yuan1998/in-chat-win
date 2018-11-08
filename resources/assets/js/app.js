/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue       from 'vue'
import VueRouter from 'vue-router'
import routes    from './routes'
import iView     from 'iview'
import 'iview/dist/styles/iview.css'
import App from './app.vue'
import store from './store';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.config.productionTip = false;

const app = new Vue({
    el: '#app' ,
    router,
    store,
    render: h => h(App)
});
