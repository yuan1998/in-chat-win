const router = {
    namespaced: true,
    state: {
        routerMap: [
            {
                path: '/test',
                name: 'test',
                component: (resolve) => require(['../pages/welcome'], resolve)
            },
            {
                path: '/admin',
                name: 'admin',
                component: (resolve) => require(['../pages/admin'], resolve),
                children: [
                    {
                        path: 'setting',
                        name: '所有配置',
                        component: (resolve) => require(['../components/setting-list'], resolve),
                    },
                    {
                        path: 'setting/:id',
                        name: '配置',
                        component: (resolve) => require(['../components/setting'], resolve),
                    },
                    {
                        path: 'message/:id',
                        name: '短句',
                        component: (resolve) => require(['../components/message-list'], resolve),
                    },
                    {
                        path: 'domain',
                        name: 'Domains',
                        component: (resolve) => require(['../components/message-list'], resolve),
                    },
                    {
                        path: 'domain/:id',
                        name: 'Domain in xx',
                        component: (resolve) => require(['../components/message-list'], resolve),
                    },

                ]
            },
            { path: '/', redirect: '/admin', hidden: true },
            { path: '*', redirect: '/404', hidden: true }
        ],
        added: false,
    },
    getters: {
        asyncRouterMap(state)
        {
            return state.routerMap;
        },
        getAdded(state)
        {
            return state.added;
        }
    },
    mutations: {
        addRouterOver(state)
        {
            state.added = true;
        }
    }
};

export default router;
