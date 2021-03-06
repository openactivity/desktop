import Main from '@/views/main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const indexRouter = {
    path: '/',
    name: 'index',
    meta: {
        title: '会务-签到客户端'
    },
    redirect: '/login'
};

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '会务-签到客户端'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/checkin',
        icon: 'gear-b',
        title: '签到',
        name: 'checkin',
        meta: {
            title: '会务-签到客户端'
        },
        component: Main,
        children: [
            { path: 'index',icon: 'md-apps', meta:{title: '签到'}, name: 'checkin-index', component: resolve => { require(['@/views/checkin.vue'], resolve); } },
        ]
    },
    {
        path: '/workspace',
        icon: 'gear-b',
        title: '工作台',
        name: 'workspace',
        meta: {
            title: '会务-签到客户端'
        },
        component: Main,
        children: [
            { path: 'index',icon: 'md-apps', meta:{title: '工作台'}, name: 'workspace-index', component: resolve => { require(['@/views/workspace.vue'], resolve); } },
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    indexRouter, loginRouter, ...appRouter
];
