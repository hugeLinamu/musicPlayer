import { playlistCategories } from '@/utils/staticData'


interface categorie {
    name: string;
    enable: boolean;
    bigCat: string;
}
const enabledPlaylistCategories = playlistCategories.filter((item: categorie) => item.enable).map((b: categorie) => b.name)

const localStorage = {
    settings: {
        enabledPlaylistCategories,
        
        proxyConfig: {
            protocol: 'noProxy',
            server: '',
            port: null,
        },
    },
    // 用户数据
    data: {
        user: {},
        loginMode: null,
        likedSongPlaylistID: 0,
        lastRefreshCookieDate: 0,
    }
}

export default localStorage