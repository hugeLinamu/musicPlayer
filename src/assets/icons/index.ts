import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue';
export default (app: App) => {
    // 全局注册svg-icon组件
    app.component("svg-icon", SvgIcon)
}