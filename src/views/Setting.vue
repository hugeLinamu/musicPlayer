<template>
    <div class="settings-page">
        <div class="container">
            <div class="user" v-if="isLoggedIn()">
                <div class="left">
                    <img class="avatar" src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60"
                        alt="">
                    <div class="info">
                        <div class="nickname">
                            几度曾相思
                        </div>
                        <div class="extra-info">
                            <span class="vip">
                                <img class="cvip"
                                    src="data:image/png;base64,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"
                                    alt="" loading="lazy">
                            </span>
                            <div class="text">黑胶VIP</div>
                        </div>
                    </div>

                </div>
                <div class="right">
                    <button>
                        <svg-icon icon-class="logout" />
                        登出
                    </button>
                </div>
            </div>
            <!-- 语言 -->
            <div class="item">
                <div class="left">
                    <div class="title">语言</div>
                </div>
                <div class="right">
                    <select v-model="lang">
                        <option value="en">🇬🇧 English</option>
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="zh-CN">🇨🇳 简体中文</option>
                        <option value="zh-TW">繁體中文</option>
                    </select>
                </div>
            </div>
            <!-- 外观 -->
            <div class="item">
                <div class="left">
                    <div class="title">外观</div>
                </div>
                <div class="right">
                    <select v-model="appearance">
                        <option value="auto">{{ "自动" }}</option>
                        <option value="light">🌞 {{ "浅色" }}</option>
                        <option value="dark">🌚 {{ "深色" }}</option>
                    </select>
                </div>
            </div>
            <!-- 音乐语种偏好 -->
            <div class="item">
                <div class="left">
                    <div class="title">音乐语种偏好</div>
                </div>
                <div class="right">
                    <select v-model="musicLanguage">
                        <option value="all">无偏好</option>
                        <option value="zh">华语</option>
                        <option value="ea">欧美</option>
                        <option value="jp">日语</option>
                        <option value="kr">韩语</option>
                    </select>
                </div>
            </div>

            <h3>音质</h3>
            <div class="item">
                <div class="left">
                    <div class="title">音质选择</div>
                </div>
                <div class="right">
                    <select v-model="musicQuality">
                        <option value="128000">
                            {{ "普通" }} - 128Kbps
                        </option>
                        <option value="192000">
                            {{ "较高" }} - 192Kbps
                        </option>
                        <option value="320000">
                            {{ "极高" }} - 320Kbps
                        </option>
                        <option value="flac">
                            {{ "无损" }} - FLAC
                        </option>
                        <option value="999000">Hi-Res</option>
                    </select>
                </div>
            </div>

            <h3>歌词</h3>
            <!-- 显示歌词翻译 -->
            <div class="item">
                <div class="left">
                    <div class="title">显示歌词翻译</div>
                </div>
                <div class="right">
                    <div class="toggle">
                        <input type="checkbox" id="show-lyrics-translation" v-model="showLyricsTranslation">
                        <label for="show-lyrics-translation"></label>
                    </div>
                </div>
            </div>
            <!-- 显示歌词背景 -->
            <div class="item">
                <div class="left">
                    <div class="title">显示歌词背景</div>
                </div>
                <div class="right">
                    <select v-model="lyricsBackground">
                        <option :value="false">
                            {{ "关闭" }}
                        </option>
                        <option :value="true">
                            {{ "打开" }}
                        </option>
                        <option value="blur"> 模糊封面 </option>
                        <option value="dynamic">
                            {{ "动态(GPU占用较高)" }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- 显示当前时间 -->
            <div class="item">
                <div class="left">
                    <div class="title">显示当前时间</div>
                </div>
                <div class="right">
                    <div class="toggle">
                        <input type="checkbox" id="show-lyrics-time" v-model="showLyricsTime"
                            name="show-lyrics-translation">
                        <label for="show-lyrics-time"></label>
                    </div>
                </div>
            </div>
            <!-- 歌词字体大小 -->
            <div class="item">
                <div class="left">
                    <div class="title">歌词字体大小</div>
                </div>
                <div class="right">
                    <select v-model="lyricFontSize">
                        <option value="16">
                            {{ "小" }} - 16px
                        </option>
                        <option value="22">
                            {{ "中" }} - 22px
                        </option>
                        <option value="28">
                            {{ "大" }} - 28px
                        </option>
                        <option value="36">
                            {{ "超大" }} - 36px
                        </option>
                    </select>
                </div>
            </div>

            <h3>第三方</h3>
            <div class="item">
                <div class="left">
                    <div class="title">
                        {{
                            '连接 Last.fm '
                        }}</div>
                </div>
                <div class="right">
                    <button>断开连接
                    </button>
                    <!-- <button v-else @click="lastfmConnect()"> 授权连接 </button> -->
                </div>
            </div>

            <h3>其他</h3>
            <div class="item">
                <div class="left">
                    <div class="title">
                        {{ "首页显示来自 Apple Music 的歌单" }}</div>
                </div>
                <div class="right">
                    <div class="toggle">
                        <input id="show-playlists-by-apple-music" v-model="showPlaylistsByAppleMusic" type="checkbox"
                            name="show-playlists-by-apple-music" />
                        <label for="show-playlists-by-apple-music"></label>
                    </div>
                </div>
            </div>
            <!-- 副标题使用别名 -->
            <div class="item">
                <div class="left">
                    <div class="title">{{ "副标题使用别名" }}</div>
                </div>
                <div class="right">
                    <div class="toggle">
                        <input id="sub-title-default" v-model="subTitleDefault" type="checkbox" name="sub-title-default" />
                        <label for="sub-title-default"></label>
                    </div>
                </div>
            </div>
            <!-- 启用倒序播放功能 (实验性功能) -->
            <div class="item">
                <div class="left">
                    <div class="title">{{ "启用倒序播放功能 (实验性功能)" }}</div>
                </div>
                <div class="right">
                    <div class="toggle">
                        <input id="enable-reversed-mode" v-model="enableReversedMode" type="checkbox"
                            name="enable-reversed-mode" />
                        <label for="enable-reversed-mode"></label>
                    </div>
                </div>
            </div>

            <!-- 🐈️ 🏳️‍🌈 -->
            <div class="item">
                <div class="left">
                    <div class="title" style="transform: scaleX(-1)">🐈️ 🏳️‍🌈</div>
                </div>
                <div class="right">
                    <div class="toggle">
                        <input id="nyancat-style" v-model="nyancatStyle" type="checkbox" name="nyancat-style" />
                        <label for="nyancat-style"></label>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p class="author">MADE BY
                    <a href="http://github.com/qier222" target="_blank">QIER222</a>
                </p>
                <p class="version">v{{ "版本号" }}</p>

                <a href="https://vercel.com/?utm_source=ohmusic&utm_campaign=oss">
                    <img height="36" src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import { isLoggedIn, } from '@/utils/auth';
import { useSettingStore } from '@/store/index'
import { changeAppearance } from '@/utils/common'

import { ref, reactive, toRefs , watch } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue';
// 触发更新
const useSettings = useSettingStore()
const { settings } = storeToRefs(useSettings)
const {
    lang,                       // 语言
    appearance,                 // 外观
    musicLanguage,              // 音乐语种偏好
    musicQuality,               // 音质选择
    lyricsBackground,           // 显示歌词背景
    lyricFontSize,              // 歌词字体大小
    showLyricsTranslation,      // 显示歌词翻译
    showLyricsTime,             // 显示当前时间
    showPlaylistsByAppleMusic,  // "首页显示来自 Apple Music 的歌单"
    subTitleDefault,            // 副标题使用别名
    enableReversedMode,         // 启用倒序播放功能 (实验性功能)
    nyancatStyle                //nyancatStyle
} = toRefs(settings.value)
// 对setting的监听
watch(settings.value,()=>{
    useSettings.updateSettings(settings.value)
})

watch(()=>settings.value.appearance,(val)=>{
    changeAppearance(val)
})

</script>

<style scoped lang="scss">
.settings-page {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 32px;
}

.container {
    margin-top: 24px;
    width: 720px;
}

h2 {
    margin-top: 48px;
    font-size: 36px;
    color: var(--color-text);
}

h3 {
    margin-top: 48px;
    padding-bottom: 12px;
    font-size: 26px;
    color: var(--color-text);
    border-bottom: 1px solid rgba(128, 128, 128, 0.18);
}

.user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-secondary-bg);
    color: var(--color-text);
    padding: 16px 20px;
    border-radius: 16px;
    margin-bottom: 48px;

    .left {
        display: flex;
        align-items: center;

        .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 25px;
        }

        .info {
            margin-left: 20px;

            .nickname {
                font-size: 24px;
                font-weight: 700;
                color: var(--color-text);
            }

            .extra-info {
                display: flex;
                align-items: center;
                justify-content: start;

                .cvip {
                    height: 16px;
                    vertical-align: bottom;
                }

                .text {
                    font-size: 16px;
                    line-height: 16px;
                    color: var(--color-text);
                    margin-left: 5px;
                    opacity: 0.68;
                }
            }
        }
    }

    .right {
        .svg-icon {
            height: 18px;
            width: 18px;
            margin-right: 4px;
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: none;
            color: var(--color-text);
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            opacity: 0.68;

            margin: {
                right: 12px;
                left: 12px;
            }

            &:hover {
                opacity: 1;
                background: #eaeffd;
                color: #335eea;
            }

            &:active {
                opacity: 1;
                transform: scale(0.92);
                transition: 0.2s;
            }
        }
    }
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px 0;
    color: var(--color-text);

    .left {
        .title {
            font-size: 16px;
            font-weight: 500;
            opacity: 0.78;
        }
    }

    .description {
        font-size: 14px;
        margin-top: 0.5em;
        opacity: 0.7;
    }

    .right {
        background: var(--color-secondary-bg);
        line-height: 30px;
        height: 30px;

        button {
            color: var(--color-text);
            background: var(--color-secondary-bg);
            padding: 8px 12px 8px 12px;
            font-weight: 600;
            border-radius: 8px;
            transition: 0.2s;

            &:hover {
                transform: scale(1.06);
            }

            &:active {
                transform: scale(0.94);
            }
        }

        select {
            min-width: 192px;
            font-weight: 600;
            color: var(--color-text);
            background: var(--color-secondary-bg);
            padding: 8px 12px 8px 12px;
            border-radius: 8px;
            border: none;
            appearance: none; // 去掉默认下拉箭头
            -webkit-appearance: none;

            &:focus {
                outline: none;
                color: var(--color-primary);
                // color:#335eea;
                background: var(--color-primary-bg);
            }
        }

        .toggle {
            display: flex;
            align-items: center;

            input {
                opacity: 0;
                position: absolute;
            }

            input+label {
                position: relative;
                height: 32px;
                width: 52px;
                background-color: red;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                border-radius: 6px;
                display: flex;
                align-items: center;
                -webkit-transition: 0.4s ease;
                transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
                background: var(--color-secondary-bg);
                box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.02), 0 4px 0px 0 hsla(0, 0%, 0%, 0.01),
                    0 4px 9px hsla(0, 0%, 0%, 0.08), 0 3px 3px hsla(0, 0%, 0%, 0.03);

                &::before {
                    position: absolute;
                    content: '';
                    display: block;
                    height: 20px;
                    width: 20px;
                    background-color: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.02), 0 4px 0px 0 hsla(0, 0%, 0%, 0.01),
                        0 4px 9px hsla(0, 0%, 0%, 0.08), 0 3px 3px hsla(0, 0%, 0%, 0.03);
                    margin: 4px;
                    transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
                }
            }

            input:checked+label {
                background: var(--color-primary);
                -webkit-transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
                transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
            }

            input:checked+label::before {
                -webkit-transform: translateX(20px);
                -ms-transform: translateX(20px);
                transform: translateX(20px);
            }
        }

    }
}


.footer {
    text-align: center;
    margin-top: 6rem;
    color: var(--color-text);
    font-weight: 600;

    .author {
        font-size: 0.9rem;
    }

    .version {
        font-size: 0.88rem;
        opacity: 0.58;
        margin-top: -10px;
    }
}
</style>
