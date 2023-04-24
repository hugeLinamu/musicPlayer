<template>
    <div class="cover-row" :style="rowStyle">
        <div v-for="item in props.items" :key="item.id" class="item" :class="{ artist: type === 'artist' }">
            <Cover :type="type" :id="item.id" :image-url="getImageUrl(item)" />
            <div class="text">
                <!-- 展示播放量 -->
                <div v-if="showPlayCount" class="info">
                    <span>
                        <svg-icon icon-class="play" />
                        {{ item.playCount }}
                    </span>
                </div>
                <div class="title">
                    {{ item.name }}
                </div>
                <div class="info" v-if="props.subText && props.type !== 'artist'">
                    {{ props.subText }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { StyleValue, computed, withDefaults, ref } from 'vue'

import Cover from '@/components/Cover.vue'

interface Props {
    // 类型
    type: string;
    items: any[];
    // 二级标题
    subText?: string;
    subTextFontSize?: string;
    // 图片尺寸
    imageSize?: number;
    // 一行多少个
    columnNumber?: number;
    // 间距
    gap?: string;
    // 播放按钮大小
    playButtonSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
    subText: '',
    subTextFontSize: '16px',
    imageSize: 0,
    columnNumber: 5,
    gap: '44px 24px',
    playButtonSize: 22
})

const showPlayCount = ref<boolean>(false)

const rowStyle = computed((): StyleValue => {
    return {
        'grid-template-columns': `repeat(${props.columnNumber}, 1fr)`,
        gap: props.gap,
    }
})

// 处理图片资源
const getImageUrl = (item: any) => {
    let img = item.coverImgUrl || item.picUrl || item.img1v1Url
    return `${img.replace('http://', 'https://')}?param=512y512`
}
</script>

<style scoped lang="scss">
.cover-row {
    display: grid;
}

.item {
    color: var(--color-text);

    .text {
        margin-top: 8px;

        .title {
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break: break-all;
        }

        .info {
            font-size: 12px;
            opacity: 0.68;
            line-height: 18px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break: break-word;
        }
    }
}

.item.artist {
    display: flex;
    flex-direction: column;
    text-align: center;

    .cover {
        display: flex;
    }

    .title {
        margin-top: 4px;
    }
}

@media (max-width: 834px) {
    .item .text .title {
        font-size: 14px;
    }
}

.explicit-symbol {
    opacity: 0.28;
    color: var(--color-text);
    float: right;

    .svg-icon {
        margin-bottom: -3px;
    }
}

.lock-icon {
    opacity: 0.28;
    color: var(--color-text);
    margin-right: 4px;

    // float: right;
    .svg-icon {
        height: 12px;
        width: 12px;
    }
}

.play-count {
    font-weight: 600;
    opacity: 0.58;
    color: var(--color-text);
    font-size: 12px;

    .svg-icon {
        margin-right: 3px;
        height: 8px;
        width: 8px;
    }
}
</style>
