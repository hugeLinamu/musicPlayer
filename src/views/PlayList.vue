<template>
    <div class="playlist-info">
        <Cover type="palylist" :id="playlist.id" :image-url="playlist.coverImgUrl" :fixed-size="288"
            :always-show-shadow="true" :cover-hover="false" :play-button-size="18" @click.right.native="openMenu" />
        <div class="info">
            <div class="title">
                {{ playlist.title }}
                <!-- <span class="lock-icon"> -->
                <!-- <svg-icon icon-class="lock" /> -->
                <!-- </span>{{ "123" }} -->
            </div>
            <div class="artist">
                Playlist by
                <span v-if="[
                    5277771961, 5277965913, 5277969451, 5277778542, 5278068783,
                ].includes(playlist.id)
                    " style="font-weight: 600">Apple Music</span>
                <a v-else :href="`https://music.163.com/#/user/home?id=${playlist.creator.userId}`" target="blank">
                    {{ playlist.creator.nickname }}</a>
            </div>
            <div class="date-and-count">
                最后更新于 {{ playlist.updateTime }} · {{ playlist.trackCount }}首歌
            </div>
            <div class="description" @click="showModel">
                {{ playlist.fullDescription }}
            </div>
            <div class="buttons">
                <!-- <ButtonTwoTone icon-class="play" @click.native="playPlaylistByID()">
                    {{ $t('common.play') }}    播放
                </ButtonTwoTone> -->
                <button icon-class="play"> 播放</button>
                <!-- <ButtonTwoTone v-if="playlist.creator.userId !== data.user.userId"
                    :icon-class="playlist.subscribed ? 'heart-solid' : 'heart'" :icon-button="true" :horizontal-padding="0"
                    :color="playlist.subscribed ? 'blue' : 'grey'" :text-color="playlist.subscribed ? '#335eea' : ''"
                    :background-color="playlist.subscribed ? 'var(--color-secondary-bg)' : ''
                        " @click.native="likePlaylist">
                </ButtonTwoTone> -->
                <!-- <ButtonTwoTone icon-class="more" :icon-button="true" :horizontal-padding="0" color="grey"
                    @click.native="openMenu">
                </ButtonTwoTone> -->
                <button icon-class="more">
                    更多
                </button>
            </div>
        </div>
    </div>
    <TrackList 
      type="playlist"
      :tracks="playlist.tracks"
      :columnNumber = 1
      :id="playlist.id"
    >
    </TrackList>
    <Modal ref="modalDom" :title="playlist.title">
        {{ playlist.fullDescription }}
    </Modal>
</template>

<script setup lang='ts'>
import { getPlaylistDetail } from '@/api/playlist'
import { resizeImage, formatTime } from '@/utils/common'
import { useRoute } from 'vue-router'
import { ref, reactive, onBeforeMount } from 'vue';

import TrackList from '@/components/TrackList.vue';
import Cover from '@/components/Cover.vue'
import Modal from '@/components/Modal.vue';

const route = useRoute()
const playlist = reactive({
    name: route.name,
    id: ~~route.params.id,
    tracks: [],                 // 歌单列表
    coverImgUrl: '',            // 歌单封面
    title: '',                  // 歌单标题
    fullDescription: '',        // 歌单描述
    creator: {                  // 歌单创建者
        userId: 0,              // 用户id
        nickname: ''            // 用户昵称
    },
    updateTime: '',             // 歌单创建时间
    trackCount: 0,              // 歌单歌曲数量
})

onBeforeMount(() => {
    if (route.name !== 'LikedSongs') {
        getData(playlist.id)
    }
})

// 获取数据
async function getData(id: number) {
    const data: any = await getPlaylistDetail(id)
    console.log(data, 'data');
    playlist.tracks = data.playlist.tracks
    playlist.coverImgUrl = resizeImage(data.playlist.coverImgUrl, 1024)
    playlist.title = data.playlist.name
    playlist.fullDescription = data.playlist.description
    playlist.creator.nickname = data.playlist.creator.nickname
    playlist.creator.userId = data.playlist.creator.userId
    playlist.updateTime = formatTime(data.playlist.updateTime)
    playlist.trackCount = data.playlist.trackCount
}


// 菜单管理
function openMenu() {

}


// 模态框
const modalDom = ref<any>(null)
function showModel() {
    console.log(modalDom.value, 'modalDom.value');
    modalDom.value.handleOpen()
}
</script>

<style scoped lang="scss">
.playlist-info {
    display: flex;
    margin-bottom: 72px;
    position: relative;

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        margin-left: 56px;

        .title {
            font-size: 36px;
            font-weight: 700;
            color: var(--color-text);

            .lock-icon {
                opacity: 0.28;
                color: var(--color-text);
                margin-right: 8px;

                .svg-icon {
                    height: 26px;
                    width: 26px;
                }
            }
        }

        .artist {
            font-size: 18px;
            opacity: 0.88;
            color: var(--color-text);
            margin-top: 24px;
        }

        .date-and-count {
            font-size: 14px;
            opacity: 0.68;
            color: var(--color-text);
            margin-top: 2px;
        }

        .description {
            font-size: 14px;
            opacity: 0.68;
            color: var(--color-text);
            margin-top: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            cursor: pointer;

            &:hover {
                transition: opacity 0.3s;
                opacity: 0.88;
            }
        }

        .buttons {
            margin-top: 32px;
            display: flex;

            button {
                margin-right: 16px;
            }
        }
    }
}
</style>
