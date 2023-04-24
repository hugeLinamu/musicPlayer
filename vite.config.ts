import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'


export default defineConfig({
  plugins: [vue(),
  // 注册所有的svg文件生成svg雪碧图
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // icon存放的目录
    symbolId: "icon-[name]", // symbol的id
    inject: "body-last", // 插入的位置
    customDomId: "__svg__icons__dom__" // svg的id
  })],
  // 配置根路径
  resolve: {
    // ↓路径别名，主要是这部分
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
})
