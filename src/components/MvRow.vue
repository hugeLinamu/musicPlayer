<template>
    <div class="mv-row">
        <div class="mv" v-for="item in props.mvs" :key="getID(item)" @click="goToMv(getID(item))">
            <div class="cover" @mouseover="hoverVideoID = getID(item)" @mouseleave="hoverVideoID = 0"
                @click="goToMv(getID(item))">
                <img :src="getUrl(item)" alt="">
                <transition name="fade">
                    <div v-show="hoverVideoID === getID(item)" class="shadow"
                        :style="{ background: 'url(' + getUrl(item) + ')' }">
                    </div>
                </transition>
            </div>
            <div class="info">
                <div class="title" :to="'/mv/' + getID(item)">
                    {{ getTitle(item) }}
                </div>
                <div class="artist" v-html="getSubtitle(item)"> </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface mvPropsInterface {
    mvs: any[],
    subtitle?: string,
    withoutPadding?: boolean
    player?: any
}
const props = withDefaults(defineProps<mvPropsInterface>(), {
    subtitle: 'artist',
    withoutPadding: false
})
const hoverVideoID = ref<number>(0)
const router = useRouter()

function goToMv(id: number) {
    let query = {};
    if (props.player !== undefined) {
        query = { autoplay: props.player.playing }
    }
    router.push({
        path: '/mv/'+id,
        query
    })
}

function getID(item: any) {
    return item.vid ?? item.id
}

function getUrl(item: any) {
    let url = item.imgurl16v9 ?? item.cover ?? item.coverUrl;
    return url.replace(/^http:/, 'https:') + '?param=464y260';
}

function getTitle(item: any) {
    return item.name ?? item.title
}

function getSubtitle(item: any) {
    if (props.subtitle === 'artist') {
        let artistName = 'null';
        let artistID = 0;
        if (item.artistName !== undefined) {
            artistName = item.artistName;
            artistID = item.artistId;
        } else if (item.creator !== undefined) {
            artistName = item.creator[0].userName;
            artistID = item.creator[0].userId;
        }
        return `<a href="/#/artist/${artistID}">${artistName}</a>`;
    } else if (props.subtitle === 'publishTime') {
        return item.publishTime;
    }
}
</script>

<style scoped lang="scss">
.mv-row {
    --col-num: 5;
    display: grid;
    grid-template-columns: repeat(var(--col-num), 1fr);
    gap: 36px 24px;
    padding: var(--main-content-padding);
}

.mv-row.without-padding {
    padding: 0;
}

@media (max-width: 900px) {
    .mv-row {
        --col-num: 4;
    }
}

@media (max-width: 800px) {
    .mv-row {
        --col-num: 3;
    }
}

@media (max-width: 700px) {
    .mv-row {
        --col-num: 2;
    }
}

@media (max-width: 550px) {
    .mv-row {
        --col-num: 1;
    }
}

.mv {
    color: var(--color-text);

    .title {
        font-size: 16px;
        font-weight: 600;
        opacity: 0.88;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
    }

    .artist {
        font-size: 12px;
        opacity: 0.68;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}

.cover {
    position: relative;
    transition: transform 0.3s;

    &:hover {
        cursor: pointer;
    }
}

img {
    border-radius: 0.75em;
    width: 100%;
    user-select: none;
}

.shadow {
    position: absolute;
    top: 6px;
    height: 100%;
    width: 100%;
    filter: blur(16px) opacity(0.4);
    transform: scale(0.9, 0.9);
    z-index: -1;
    background-size: cover;
    border-radius: 0.75em;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>
