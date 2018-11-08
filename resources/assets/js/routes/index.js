
const routes = [
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['../pages/login'], resolve)
    }
];

export default routes;
