<template>
    <div class="login">
        <div class="icons">
            <img src="@/assets/images/yesplaymusic.png" alt="yesplaymusic.png">
            <svg-icon iconClass="x"></svg-icon>
            <img src="@/assets/images/netease-music.png" alt="netease-music.png">
        </div>
        <div class="login-card">
            <div class="card" @mouseenter="showArrowRight = 1" @mouseleave="showArrowRight = 0"
                :class="{ active: showArrowRight === 1 }" @click="goto('account')">
                <div class="title-info">
                    <div class="title"> 登录网易云账号 </div>
                    <div class="info"> 可访问全部数据 </div>
                </div>
                <svg-icon icon-class="arrow-right"></svg-icon>
            </div>
            <div class="card" @mouseenter="showArrowRight = 2" @mouseleave="showArrowRight = 0"
                :class="{ active: showArrowRight === 2 }" @click="goto('username')">
                <div class="title-info">
                    <div class="title">搜索网易云账号 </div>
                    <div class="info">只能读取账号公开数据 </div>
                </div>
                <svg-icon icon-class="arrow-right"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const showArrowRight = ref(0) // 0 表示不显示 1表示上面那个显示 2表示下面那个显示
function goto(where: string) {
    const firstChar = where.charAt(0).toUpperCase()
    const otherChar = where.slice(1)
    where = firstChar + otherChar
    router.push({
        name: where
    })
}


</script>

<style scoped lang="scss">
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 192px);

    .icons {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        img {
            width: 70px;
            margin: 20px;
        }

        .svg-icon {
            height: 24px;
            width: 24px;
            color: rgba(82, 82, 82, 0.28);
        }
    }

    .login-card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 128px;
        width: 300px;
        margin: 14px 0;
        border-radius: 8px;
        padding-left: 22px;
        color: #335eea;
        background: #eaeffd;
        transition: all .3s;

        .title-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            transition: all .3s;

            .title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 4px;
            }

            .info {
                color: rgba(51, 94, 234, 0.78);
                font-size: 14px;
                margin-top: 2px;
            }
        }

        .svg-icon {
            opacity: 0;
            height: 24px;
            width: 24px;
            margin-left: 16px;
            transition: all 0.3s;
        }
    }

    .card.active {
        .title-info {
            transform: translateX(-8px);
        }

        .svg-icon {
            opacity: 1;
            visibility: visible;
            transform: translateX(8px);
        }
    }

}
</style>
