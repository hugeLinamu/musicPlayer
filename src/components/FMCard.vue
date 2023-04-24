<template>
    <div class="fm">
        <img src="https://p3.music.126.net/7rWFdO3eiw4NsyYbmMyjsw==/109951168536167356.jpg?param=512y512" alt=""
            loading="lazy">
        <div class="right-part">
            <div class="info">
                <div class="title">知足</div>
                <div class="artist">五月天, 告五人</div>
            </div>
            <div class="controls">
                <div class="button">
                    <button class="button-icon">
                        <svg-icon icon-class="thumbs-down" />
                    </button>
                    <button class="button-icon">
                        <svg-icon icon-class="play" v-if="showPlay" />
                        <svg-icon icon-class="pause" v-if="!showPlay" />
                    </button>
                    <button class="button-icon">
                        <svg-icon icon-class="next" />
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const showPlay = ref<boolean>(true)

</script>

<style scoped lang="scss">
.fm {
    display: flex;
    background: var(--color-secondary-bg);
    border-radius: 8px;
    height: 198px;
    box-sizing: border-box;
    padding: 16px;
    background-color: pink;

    img {
        clip-path: border-box;
        border-radius: 0.75rem;
        margin-right: 20px;
        cursor: pointer;
        user-select: none;
    }

    .right-part {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: var(--color-text);
        width: 100%;

        .info {
            display: flex;
            flex-direction: column;

            .title {
                font-size: 1.6rem;
                font-weight: 600;
                margin-bottom: 0.6rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                word-break: break-all;
            }

            .artist {
                opacity: 0.68;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                word-break: break-all;
            }
        }

        .controls {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-left: -4px;

            .buttons {
                display: flex;
            }

            .button-icon {
                margin: 0 20px 0 0;
            }

            .svg-icon {
                width: 24px;
                height: 24px;
            }

            .svg-icon#thumbs-down {
                width: 22px;
                height: 22px;
            }

            .card-name {
                font-size: 1rem;
                opacity: 0.18;
                display: flex;
                align-items: center;
                font-weight: 600;
                user-select: none;

                .svg-icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 6px;
                }
            }
        }
    }
}</style>
