<template>
    <div class="cover-container" @mouseenter="focus = true" @mouseleave="focus = false"
        @click="clickCoverToPlay ? play() : goto()">
        <div class="shade" v-show="focus">
            <button class="play-button" :style="playButtonStyles" @click.stop="play()">
                <svg-icon icon-class="play" />
            </button>
        </div>
        <img :src="imageUrl" loading="lazy" :style="imageStyles" />
        <transition name="fade" v-if="coverHover || alwaysShowShadow">
            <div class="shadow" v-show="focus || alwaysShowShadow" :style="shadowStyles"></div>
        </transition>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { computed, ref, withDefaults } from 'vue'

interface Props {
    // 类型
    type: string;
    // 每个图片id值
    id: number;
    // 图片地址
    imageUrl: string;
    // 图片圆角
    ridus?: number;
    // 是否一直有阴影
    alwaysShowShadow?: boolean
    // 播放按钮大小
    playButtonSize?: number
    // 一直显示播放按钮
    alwaysShowPlayButton?: boolean
    // 鼠标经过是否显示阴影
    coverHover?: boolean
    //  阴影距离上边外边距
    shadowMargin?: number
    //clickCoverToPlay是否点击图片播放
    clickCoverToPlay?: boolean
    //fixedSize图片固定大小
    fixedSize?: number
}

const props = withDefaults(defineProps<Props>(), {
    ridus: 12,
    alwaysShowShadow: false,
    playButtonSize: 22,
    alwaysShowPlayButton: false,
    coverHover: true,
    shadowMargin: 12,
    clickCoverToPlay: false,
    fixedSize: 0
});

const router = useRouter()
const focus = ref(false);
const shadowStyles = computed(() => {
    let styles = {
        backgroundImage: '',
        borderRadius: ''
    };
    styles.backgroundImage = `url(${props.imageUrl})`;
    if (props.type === 'artist') styles.borderRadius = '50%';
    return styles;
})
const imageStyles = computed(() => {
    let styles = {
        borderRadius: props.ridus + 'px',
        width: '100%',
        height: '100%'
    }
    if (props.fixedSize !== 0) {
        styles.width = props.fixedSize + 'px'
        styles.height = props.fixedSize + 'px'
    }
    props.type === 'artist' ? styles.borderRadius = styles.borderRadius = '50%' : ''
    return styles;
})
const playButtonStyles = computed(() => {
    let styles = {
        width: props.playButtonSize + '%',
        height: props.playButtonSize + '%',
        borderRadius: '50%'
    }
    return styles;
})

// 待完善play
function play() {
    console.log('play');
}

function goto() {
    router.push({
        name: props.type,
        params: {
            id: props.id
        }
    })
}


</script>

<style scoped lang="scss">
.cover-container {
    position: relative;

    &:hover {
        cursor: pointer;
    }
}

img {
    border-radius: 0.75em;
    width: 100%;
    user-select: none;
    aspect-ratio: 1 / 1;
    border: 1px solid rgba(0, 0, 0, 0.04);
}

.cover-hover {
    &:hover {
        cursor: pointer;
        /* transform: scale(1.02); */
    }
}

.shade {
    position: absolute;
    top: 0;
    height: calc(100% - 3px);
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}

.play-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.08);
    height: 22%;
    width: 22%;
    border-radius: 50%;
    cursor: default;
    transition: 0.2s;

    .svg-icon {
        height: 44%;

        margin: {
            left: 4px;
        }
    }

    &:hover {
        background: rgba(255, 255, 255, 0.28);
    }

    &:active {
        transform: scale(0.94);
    }
}

.shadow {
    position: absolute;
    top: 12px;
    height: 100%;
    width: 100%;
    filter: blur(16px) opacity(0.6);
    transform: scale(0.92, 0.96);
    z-index: -1;
    background-size: cover;
    border-radius: 0.75em;
    aspect-ratio: 1 / 1;
    background-color: pink;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>