<template>
    <div v-if="showMenu" ref="menuDom" class="menu" tabindex="-1" @blur="closeMenu" @click="closeMenu">
        <slot>
        </slot>
    </div>
</template>

<script setup lang='ts'>
import { ref, nextTick } from 'vue';

const props = defineProps<{
    x: number,  // 鼠标的横坐标
    y: number   // 鼠标的纵坐标
}>()

const emits = defineEmits<{
    (e:'close') : void
}>()

let showMenu = ref<boolean>(false)
const menuDom = ref<HTMLElement | null>(null)

function setMenu(x: any, y: any) {
    const viewWidth = window.innerWidth
    const viewHeight = window.innerHeight
    const menuWidth = menuDom.value?.offsetWidth
    const menuHeight = menuDom.value?.offsetHeight
    // 塞得下: 屏幕宽度 - 鼠标宽度 > 菜单宽度
    menuDom.value!.style.left = viewWidth - menuWidth! > x ? (`${x}px`) : (`${viewWidth - menuWidth!}px`)
    // 塞得下: 屏幕高度 - 鼠标高度  > 菜单高度 
    menuDom.value!.style.top = viewHeight - menuHeight! > y ? (`${y}px`) : (`${viewHeight - menuHeight!}px`)
}

function openMenu() {
    showMenu.value = true
    // 必须获得最新的dom元素之后才可以focus和设置位置
    nextTick(() => {
        menuDom.value?.focus()
        setMenu(props.x, props.y)
    })
}

function closeMenu() {
    showMenu.value = false
    // 关闭菜单，如果父组件有绑定自定义colse事件则触发父组件的close事件
    // console.log('closeMenu');
    emits('close')
}


defineExpose({
    openMenu,
    closeMenu
})
</script>


<style  scoped lang="scss">
.menu {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 136px;
    max-width: 240px;
    list-style: none;
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    box-sizing: border-box;
    padding: 6px;
    z-index: 999;
    -webkit-app-region: no-drag;
    transition: background 125ms ease-out, opacity 125ms ease-out,
        transform 125ms ease-out;

    &:focus {
        outline: none;
    }

    // 这里需要用到插槽选择器
    :slotted(.item) {
        font-weight: 600;
        font-size: 14px;
        padding: 10px 14px;
        border-radius: 8px;
        cursor: pointer;
        color: var(--color-text);
        display: flex;
        align-items: center;

        &:hover {
            color: var(--color-primary);
            background: var(--color-primary-bg-for-transparent);
            transition: opacity 125ms ease-out, transform 125ms ease-out;
        }

        &:active {
            opacity: 0.75;
            transform: scale(0.95);
        }

        .svg-icon {
            height: 16px;
            width: 16px;
            margin-right: 5px;
        }
    }

    :slotted(.item-info) {
        padding: 10px 10px;
        display: flex;
        align-items: center;
        color: var(--color-text);
        cursor: default;

        img {
            height: 38px;
            width: 38px;
            border-radius: 4px;
        }

        .info {
            margin-left: 10px;
        }

        .title {
            font-size: 16px;
            font-weight: 600;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            word-break: break-all;
        }

        .subtitle {
            font-size: 12px;
            opacity: 0.68;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            word-break: break-all;
        }
    }
}
</style>
