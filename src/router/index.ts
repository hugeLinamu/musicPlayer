import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/explore',
        name: 'Explore',
        component: () => import('@/views/Explore.vue'),
    },
    {
        path: '/library',
        name: 'Library',
        component: () => import('@/views/Library.vue'),
    },
    {
        path: '/search:keywords',
        name: 'Search',
        component: () => import('@/views/Search.vue'),
    },
    {
        path: '/dailySongs',
        name: 'DailySongs',
        component: () => import('@/views/DialyTracks.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path:'/login/account',
        name:'Account',
        component:()=>import('@/views/LoginAccount.vue')
    },
    {
        path:'/login/account',
        name:'Username',
        component:()=>import('@/views/LoginUsername.vue')
    },
    {
        path:'/mv/:id',
        name:'MV',
        component:()=>import('@/views/Mv.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
