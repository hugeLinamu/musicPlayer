import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'
import { isLoggedIn } from '@/utils/auth';
const isLogin = isLoggedIn();

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            keepAlive: true,
            savePosition: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/login/username',
        name: 'Username',
        component: () => import('@/views/LoginUsername.vue')
    },
    {
        path: '/login/account',
        name: 'Account',
        component: () => import('@/views/LoginAccount.vue')
    },
    {
        path: '/playlist/:id',
        name: 'Playlist',
        component: () => import('@/views/PlayList.vue')
    },

    {
        path: '/album/:id',
        name: 'Album',
        component: () => import('@/views/Album.vue')
    },
    {
        path: '/artist/:id',
        name: 'Artist',
        component: () => import('@/views/Artist.vue'),
        meta: {
            keepAlive: true,
            savePosition: true,
        },
    },
    {
        path: '/artist/:id/mv',
        name: 'ArtistMV',
        component: () => import('@/views/AritstMV.vue'),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: '/mv/:id',
        name: 'MV',
        component: () => import('@/views/Mv.vue')
    },
    {
        path: '/next',
        name: 'Next',
        component: () => import('@/views/Next.vue'),
        meta: {
            keepAlive: true,
            savePosition: true,
        },
    },
    {
        path: '/search:keywords',
        name: 'Search',
        component: () => import('@/views/Search.vue'),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: '/search/:keywords/:type',
        name: 'SearchType',
        component: () => import('@/views/SearchType.vue'),
    },
    {
        path: '/new-album',
        name: 'NewAlbum',
        component: () => import('@/views/NewAlbum.vue'),
    },
    {
        path: '/explore',
        name: 'Explore',
        component: () => import('@/views/Explore.vue'),
        meta: {
            keepAlive: true,
            savePosition: true,
        },
    },
    {
        path: '/library',
        name: 'Library',
        component: () => import('@/views/Library.vue'),
        meta: {
            requireLogin: true,
            keepAlive: true,
            savePosition: true,
        },
        // beforeEnter(to, from, next) {
        //     if (isLogin) {
        //         next();
        //     } else {
        //         next('/login');
        //     }
        //     next()
        // }
    },
    {
        path: '/library/liked-songs',
        name: 'LikedSongs',
        component: () => import('@/views/PlayList.vue'),
        meta: {
            requireLogin: true,
        },
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue')
    },
    {
        path: '/daily/Songs',
        name: 'DailySongs',
        component: () => import('@/views/DialyTracks.vue'),
        meta: {
            requireAccountLogin: true,
        },
    },

    {
        path: '/lastfm/callback',
        name: 'LastfmCallback',
        component: () => import('@/views/LastfmCallback.vue'),
    },




]

export default createRouter({
    history: createWebHistory(),
    routes
})
