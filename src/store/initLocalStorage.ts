import { playlistCategories } from '@/utils/staticData'


interface categorie {
    name: string;
    enable: boolean;
    bigCat: string;
}
const enabledPlaylistCategories = playlistCategories.filter((item: categorie) => item.enable).map((b: categorie) => b.name)

const localStorage = {
    settings: {
        lang: 'zh-CN',  // 语言
        musicLanguage: 'all',   // 音乐语种偏好
        appearance: 'auto', // 外观
        musicQuality: 320000,   // 音乐质量
        lyricFontSize: 28,  // 歌词字体大小
        outputDevice: 'default',    // 输出设备
        showPlaylistsByAppleMusic: true,    // 显示Apple Music歌单
        enableUnblockNeteaseMusic: true,    // 启用解锁网易云音乐
        automaticallyCacheSongs: true,  // 自动缓存歌曲
        cacheLimit: 8192,   // 缓存限制
        enableReversedMode: false,  // 启用反向模式
        nyancatStyle: false,    // 启用NyanCat样式
        showLyricsTranslation: true,    // 显示歌词翻译
        lyricsBackground: true, // 歌词背景
        closeAppOption: 'ask',  // 关闭应用选项 
        enableDiscordRichPresence: false,   // 启用Discord Rich Presence
        enableGlobalShortcut: true, // 启用全局快捷键
        showLibraryDefault: false,  // 显示库默认
        subTitleDefault: false, // 显示副标题默认
        linuxEnableCustomTitlebar: false,   // Linux启用自定义标题栏
        showLyricsTime:false,       // 显示歌词时间
        enabledPlaylistCategories,  // 启用的歌单分类
        proxyConfig: {  // 代理配置
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