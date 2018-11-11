
const routes = [
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['../pages/login'], resolve)
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: (resolve) => require(['../pages/welcome'], resolve)
    },
    {
        path: '/404',
        name: '404',
        component: (resolve) => require(['../pages/404'], resolve)
    }

];

export default routes;
