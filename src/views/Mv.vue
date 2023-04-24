<template>
    <div class="current-video">
        <div class="video">
            <video ref="videoPlayer" class="plyr"></video>
        </div>
        <div class="video-info">
            <div class="title">
                <router-link to="">
                    {{ videoDate.artist }}
                </router-link>
                -
                {{ videoDate.title }}
                <div class="buttons">
                    <ButtonIcon class="button" @click="handleLike">
                        <svg-icon iconClass="heart"></svg-icon>
                    </ButtonIcon>
                    <ButtonIcon class="button" @click="handleShowMore">
                        <svg-icon iconClass="more"></svg-icon>
                    </ButtonIcon>
                </div>
            </div>
            <div class="info">
                {{ videoDate.playCount }} Views ·
                {{ videoDate.publishTime }}
            </div>
        </div>
    </div>
    <div class="more-video">
        <div class="section-title"> 更多视频 </div>
        <MvRow :mvs="videoDate.simiMv"></MvRow>
    </div>

    <ContextMenu v-bind="position" ref="menu">
        <div class="item" @click="handleCopyUrl(~~mvId)">复制链接</div>
        <div class="item" @click="openInBrowser(~~mvId)">在浏览器中打开</div>
    </ContextMenu>
</template>

<script setup lang='ts'>
import { useToastStore } from '@/store/index'
import { mvDetail, mvUrl, simiMv, likeAMV } from '@/api/mv'
import { onMounted, computed, ref, reactive } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import Plyr from 'plyr';
import '@/assets/css/plyr.css';
import MvRow from '@/components/MvRow.vue';
import ButtonIcon from '@/components/ButtonIcon.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import { isLoggedIn } from '@/utils/auth';


const useToast = useToastStore()
const route = useRoute()

const mvId = computed(() => {
    return route.params.id as string ?? ''
})

const videoDate = reactive({
    r: [],                 // r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
    currtentR: 1080,       // 当前分辨率
    artist: '',            // 歌手
    title: '',             // 视频标题 
    playCount: 0,          // 播放次数
    url: '',               // 视频地址
    publishTime: '',       // 发布时间
    simiMv: [],            // 相似的视频
    subed: false,          // 是否已收藏
})
const playerOptions = reactive({
    settings: ['captions', 'quality', 'speed', 'loop'],
    autoplay: false,
    quality: {
        default: 1080,
        options: [1080, 720, 480, 240],
    },
})
const videoPlayer = ref<HTMLVideoElement | null>(null)
const player = ref<any>(null)

onBeforeRouteUpdate((to, from, next) => {
    getData(~~to.params.id)
    next()
})

onMounted((() => {
    if (route.query.autoplay === 'true') playerOptions.autoplay = true;
    // 设置音量
    player.value = new Plyr(videoPlayer.value as HTMLElement, playerOptions)
    getData(~~route.params.id!)

}))
// 获得全部数据
async function getData(id: number) {
    await getmvDetail(id)
    getSimiMv(id)
}

async function getmvDetail(id: number) {
    const { data } = await mvDetail(id)
    console.log(data, 'getmvDetail result')
    videoDate.r = data.data.brs.map((item: any) => item.br)
    videoDate.artist = data.data.artistName
    videoDate.title = data.data.name
    videoDate.playCount = data.data.playCount
    videoDate.publishTime = data.data.publishTime
    videoDate.subed = data.subed
    // 根据所有分辨率获取所有视频地址，返回pending数组
    const results = videoDate.r.map((br: number) =>
        mvUrl({ id, r: br })
    )
    // 等待所有pending完成
    Promise.all(results).then(ress => {
        // 处理返回结果
        const sources = ress.map((res: any) => {
            // 有些视频没有1080p，这里做个兼容
            return {
                src: res.data.data.url.replace(/^http:/, 'https:'),
                type: 'video/mp4',
                size: res.data.data.r,
            }
        })
        // 设置视频源，为不同分辨率的视频源设置对印的地址，类型
        player.value.source = {
            type: 'video',
            title: data.data.name,
            sources: sources,
            poster: data.data.cover,
        }
    })
}

// 处理菜单
const menu = ref<HTMLElement | null>(null)
const position = reactive({
    x: 0,
    y: 0,
})
function handleShowMore(e: MouseEvent) {
    (menu.value! as any).openMenu()
    position.x = e.x
    position.y = e.y
}
function openInBrowser(id: number) {
    const url = `https://music.163.com/#/mv?id=${id}`;
    window.open(url);
}
// 处理更多视频
async function getSimiMv(id: number) {
    const { data } = await simiMv(id)
    videoDate.simiMv = data.mvs
    return new Promise((resolve) => {
        resolve(data)
    })
}

// 复制
async function handleCopyUrl(id: number) {
    const url = `https://music.163.com/#/mv?id=${id}`;
    navigator.clipboard.writeText(url);
    useToast.updateToast('复制成功')
}

// 喜欢
async function handleLike(id: number) {
    if (!isLoggedIn()) return useToast.updateToast('请先登录')
    const reuslt = await likeAMV({
        mvid: id,
        t: videoDate.subed ? 0 : 1
    })
    videoDate.subed = !videoDate.subed
}

</script>
<style lang="scss" scoped>
.video {
    --plyr-color-main: #335eea;
    --plyr-control-radius: 8px;
}

.mv-page {
    width: 100%;
    margin-top: 32px;
}

.current-video {
    width: 100%;
}

.video {
    border-radius: 16px;
    background: transparent;
    overflow: hidden;
    max-height: 100vh;
}

.video-info {
    margin-top: 12px;
    color: var(--color-text);

    .title {
        font-size: 24px;
        font-weight: 600;
    }

    .artist {
        font-size: 14px;
        opacity: 0.88;
        margin-top: 2px;
        font-weight: 600;
    }

    .info {
        font-size: 16px;
        opacity: 0.68;
        margin-top: 12px;
    }
}

.more-video {
    margin-top: 48px;

    .section-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--color-text);
        opacity: 0.88;
        margin-bottom: 12px;
    }
}

.buttons {
    display: inline-block;

    .button {
        display: inline-block;
    }

    .svg-icon {
        height: 18px;
        width: 18px;
        color: var(--color-primary);
    }
}
</style>

