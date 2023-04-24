<template>
    <div class="track-list" :style="trackListStyle">
        <!-- 去掉浏览器默认事件，添加自定义事件 -->
        <ContextMenu 
        v-bind="mouse"
         ref="contextMenuDom"
         @close="closeMenu"
        >
            <div class="item-info">
                <img :src="menuData.imgUrl" loading="lazy">
                <div class="info">
                    <div class="title">{{ menuData.title }}</div>
                    <div class="subtitle">{{ menuData.subTitle }}</div>
                </div>
            </div>
            <hr>
            <div class="item">{{ "播放" }}</div>
            <div class="item">{{ " 添加到队列" }}</div>
            <div class="item">{{ " 添加到我喜欢的音乐" }}</div>
            <div class="item">{{ " 添加到歌单" }}</div>
            <div class="item">{{ " 复制链接" }}</div>
        </ContextMenu>
        <TrackListItem 
            v-for="track, index in  tracks" 
            :key="track" :track="track" 
            @contextmenu.prevent="rightClick($event, track, index)"
            :activeId = menuActive.id
        >
        </TrackListItem>

    </div>
</template>

<script setup lang='ts'>

import { withDefaults, reactive, ref, computed } from 'vue'
import TrackListItem from './TrackListItem.vue'
import ContextMenu from './ContextMenu.vue';
interface tracklistProps {
    tracks: any,
    type?: string,
    id?: number,
    dbclickTrackFunc?: string,
    albumObject?: {
        artist: {
            name: string
        }
    },
    extraContextMenuItem?: any,
    columnNumber?: number,
    highlightPlayingTrack?: boolean,
    itemKey?: string
}
const props = withDefaults(defineProps<tracklistProps>(), {
    type: 'tracklist',
    id: 0,
    dbclickTrackFunc: 'default',
    albumObject: {} as any,
    extraContextMenuItem: [],
    columnNumber: 4,
    highlightPlayingTrack: true,
    itemKey: 'id'
})

const trackListStyle = computed(() => {
    return {
        gap: '4px',
        'grid-template-columns': `repeat(${props.columnNumber}, 1fr)`
    }
})

// 每个track歌曲菜单内容
const menuData = reactive({
    imgUrl: '',
    title: '',
    subTitle: '',
})

// 点击了哪个menu
const menuActive = reactive({
    id: -1,
}) 

const contextMenuDom = ref<HTMLElement | null>(null)
const mouse = reactive({
    x: 0,
    y: 0
})
function rightClick(e: MouseEvent, item: any, index: number) {
    console.log(props.tracks, 'props.tracks');
    console.log(item, 'item');
    mouse.x = e.x
    mouse.y = e.y
    menuData.imgUrl = item.al.picUrl ?? 'https://p2.music.126.net/UeTuwE7pvjBpypWLudqukA==/3132508627578625.jpg'
    menuData.title = item.name
    menuData.subTitle = item.ar[0].name
    menuActive.id = index
    menuActive.id = item.id
    ;(contextMenuDom.value as any).openMenu()
}

function closeMenu(){
    console.log('emit触发了')
    menuActive.id = -1
}


</script>

<style scoped lang="scss">
.track-list {
    display: grid;
}
</style>
