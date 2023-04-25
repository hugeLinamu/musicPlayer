import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'
import { isLoggedIn } from '@/utils/auth';
const isLogin = isLoggedIn();

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
        beforeEnter(to, from, next) {
            if (isLogin) {
                next();
            } else {
                next('/login');
            }
            next()
        }
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
        path: '/login/account',
        name: 'Account',
        component: () => import('@/views/LoginAccount.vue')
    },
    {
        path: '/login/account',
        name: 'Username',
        component: () => import('@/views/LoginUsername.vue')
    },
    {
        path: '/mv/:id',
        name: 'MV',
        component: () => import('@/views/Mv.vue')
    },
    {
        path:'/setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
