import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store'
import { ref, toRefs, watchEffect } from 'vue'

const useSettings = useSettingStore()
const { settings } = storeToRefs(useSettings)   // settings.value 是一个 Proxy 对象

// 获取主题变量
const { appearance } = toRefs(settings.value)   // 把主题变量 从 Proxy 对象中解构出来,并使其保持响应式 , 即 appearance的值发生改变, setings中的值也会发生改变


// 查询当前系统主题颜色
const match: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")
// 监听系统主题变化
match.addEventListener('change', followSystem)

function followSystem() {
    const theme = match.matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
}

watchEffect(() => {
    // 如果主题变量为 auto, 则跟随系统主题
    if (appearance.value === 'auto') {
        followSystem()
    } else {
        document.documentElement.setAttribute('data-theme', appearance.value)
    }
})


export default function useThemeColor() {
    return {
        appearance,
    }
}