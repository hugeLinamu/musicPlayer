import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/global.scss'
import initSvgIcon from '@/assets/icons/index';
import router from '@/router'
import "virtual:svg-icons-register"
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(initSvgIcon)
app.use(router)
app.use(createPinia())
app.mount('#app')
