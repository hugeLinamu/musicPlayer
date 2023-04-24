<template>
    <div class="daily-recommend-card" @click.stop="goToDailyTracks">
        <img :src="getRandomCover()" loading="lazy" />
        <div class="container">
            <div class="title-box">
                <div class="title">
                    <span>每</span>
                    <span>日</span>
                    <span>推</span>
                    <span>荐</span>
                </div>
            </div>
        </div>
        <button class="play-button">
            <svg-icon icon-class="play" />
        </button>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const defaultCovers = [
    'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg',
    'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg',
    'https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg',
];


function getRandomCover() {
    const index = Math.floor(Math.random() * defaultCovers.length)
    return defaultCovers[index]
}
getRandomCover()

// 去到每日推荐界面
function goToDailyTracks() {
    router.push({ name: 'DailySongs' })
}



</script>

<style scoped lang="scss">
.daily-recommend-card {
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    z-index: 1;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        animation: move 30s infinite;
        animation-direction: alternate;
        z-index: -1;
    }

    .container {
        background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.28));
        height: 198px;
        width: 50%;
        display: flex;
        align-items: center;
        border-radius: 0.94rem;

        .title-box {
            height: 148px;
            width: 148px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 25px;
            user-select: none;

            .title {
                height: 100%;
                width: 100%;
                font-weight: 600;
                font-size: 64px;
                line-height: 48px;
                opacity: 0.96;
                display: grid;
                grid-template-columns: 1fr 1fr;
                justify-items: center;
                place-items: center;
            }
        }
    }

    .play-button {
        position: absolute;
        right: 1.6rem;
        bottom: 1.4rem;
        height: 44px;
        width: 44px;
        margin-bottom: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.24);
        cursor: default;

        .svg-icon {
            margin-left: 4px;
            height: 16px;
            width: 16px;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.44);
        }

        &:active {
            transform: scale(0.94);
        }
    }


}


@keyframes move {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
    }
}
</style>