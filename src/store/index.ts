
import { userAccount, userPlaylist } from '@/api/user'
import initLocalStorage from './initLocalStorage'
import { defineStore } from "pinia";
import { reactive, ref } from 'vue'

if (!localStorage.getItem('settings')) {
    // localStorage 中没有setting 就初始化 localStorage中的 setting
    localStorage.setItem('settings', JSON.stringify(initLocalStorage.settings))
    localStorage.setItem('data', JSON.stringify(initLocalStorage.data))
}



export const useSettingStore = defineStore('setting', () => {
    const result = localStorage.getItem('settings') as string
    const settings = reactive(JSON.parse(result))

    // 发现页面的歌单分类
    function togglePlaylistCategory(name: string) {
        const index = settings.enabledPlaylistCategories.indexOf(name)
        if (index !== -1) {
            settings.enabledPlaylistCategories = settings.enabledPlaylistCategories.filter((item: string) => item !== name)
        } else {
            settings.enabledPlaylistCategories.push(name)
        }
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    // 更新设置
    function updateSettings( val:any) {
        localStorage.setItem('settings', JSON.stringify(val))
    }

    return {
        settings,
        togglePlaylistCategory,
        updateSettings,
    }
})

// 用户数据
export const useDataStore = defineStore('data', () => {
    const result = localStorage.getItem('data') as string
    const data = reactive(JSON.parse(result))

    // 更改用户数据
    function updataData(key: string, value: any) {
        data[key] = value
        console.log(data);
    }

    // 获取用户账号
    async function fetchUserProfile() {
        const result = await userAccount()
        result.data.code === 200 && updataData('user', result.data.account)
        console.log(data, "fetchUserProfile data");
    }

    // 获取用户喜欢的歌单
    async function fetchLikedPlaylist() {
        const result = await userPlaylist({
            uid: data.user.id,
            limit: 2000,
            timestamp: new Date().getTime(),
        })
        console.log(result, 'fetchLikedPlaylist result');
    }

    return {
        data,
        updataData,
        fetchUserProfile,
        fetchLikedPlaylist
    }
})

export const usePlayerStore = defineStore('player', () => {

})


export const useLastfmStore = defineStore('lastfm', () => {

})

export const useLikeStore = defineStore('lick', () => {

})


export const useContextMenuStore = defineStore('contextMenu', () => {

})


// 提示框
export const useToastStore = defineStore('toast', () => {
    const showToast = ref<boolean>(false)
    const toastText = ref<string>('')
    function updateToast(val: string) {
        showToast.value = true
        toastText.value = val
        setTimeout(() => {
            console.log(123);
            showToast.value = false
            toastText.value = ''
        }, 2000)
    }

    return {
        showToast,
        updateToast,
        toastText
    }
})



export const useModalsStore = defineStore('modals', () => {

})


