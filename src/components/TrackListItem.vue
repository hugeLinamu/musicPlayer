<template>
  <div class="track" @mouseover="hover = true" @mouseleave="hover = false" :class="tarckClass">
    <img :src="imgUrl" alt="">
    <div class="title-and-artist">
      <div class="container">
        <div class="title">{{ title }}</div>
        <div class="artist">{{ subTitle }}</div>
      </div>
    </div>
    <!-- 专辑名称 -->
    <div v-if="showAlbumName" class="ablum">
      <router-link v-if="trackItem.albumId" :to="`/album/${trackItem.albumId}`">{{ trackItem.albumName }}</router-link>
    </div>
    <!-- 歌曲喜欢 | 不喜欢 -->
    <div v-if="showLikeButton" class="actions">
      <button @click="likeThisSong">
        <svg-icon icon-class="heart"  
        :style="{
            visibility: focus && !isLiked ? 'visible' : 'hidden',
          }"></svg-icon>
      </button>
    </div>

    <!--  时间 -->
  </div>
</template>

<script setup lang='ts'>
import { withDefaults, computed, ref, reactive } from 'vue'

interface tracklistItemProps {
  activeId: number,
  track: any,
  type: string,
  highlightPlayingTrack?: boolean,
}
const props = withDefaults(defineProps<tracklistItemProps>(), {
  activeId: 0,
  highlightPlayingTrack: true,

})
// console.log(props.track, 'props.track');

const trackItem = reactive({
  type: props.type,                  // 类型
  albumName: props.track.al.name,    // 专辑名
  albumId: props.track.al.id,        // 专辑id

})


const showAlbumName = computed(() => {
  return trackItem.type !== 'album' && trackItem.type !== 'tracklist'
})
const showLikeButton = computed(()=>{
  return trackItem.type !== 'tracklist' && trackItem.type !== 'cloudDisk'
})

const hover = ref<boolean>(false)

const focus = computed(() => {
  return props.track.id === props.activeId ? true : false
})

const tarckClass = computed(() => {
  const classArr: string[] = []
    // 鼠标移到这个歌曲, 并且activeId 为初始值，就高亮
    // 或者 右击这个歌曲的时候就高亮 , 右击的时候会改变activeId的值
    ; ((hover.value && props.activeId === -1) || focus.value) && classArr.push('focus')
  return classArr
})
// console.log(props.track);

const imgUrl = computed(() => {
  let url =
    props.track.al.picUrl ??
    props.track.album?.picUrl ??
    'https://p2.music.126.net/UeTuwE7pvjBpypWLudqukA==/3132508627578625.jpg'
  return url + '?param=224y224'
})

const title = computed(() => {
  return props.track.name
})

const subTitle = computed(() => {
  return props.track.ar[0].name
})

const likeThisSong = () => {
  console.log('likeThisSong');
}





</script>


<style scoped lang="scss">
button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: transparent;
  border-radius: 25%;
  transition: transform 0.2s;

  .svg-icon {
    height: 16px;
    width: 16px;
    color: var(--color-primary);
  }

  &:hover {
    transform: scale(1.12);
  }

  &:active {
    transform: scale(0.96);
  }
}

.track {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 12px;
  user-select: none;

  .no {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 0 20px 0 10px;
    width: 12px;
    color: var(--color-text);
    cursor: default;

    span {
      opacity: 0.58;
    }
  }

  .explicit-symbol {
    opacity: 0.28;
    color: var(--color-text);

    .svg-icon {
      margin-bottom: -3px;
    }
  }

  .explicit-symbol.before-artist {
    .svg-icon {
      margin-bottom: -3px;
    }
  }

  img {
    border-radius: 8px;
    height: 46px;
    width: 46px;
    margin-right: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  img.hover {
    filter: drop-shadow(100 200 0 black);
  }

  .title-and-artist {
    flex: 1;
    display: flex;

    .container {
      display: flex;
      flex-direction: column;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text);
      cursor: default;
      padding-right: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;

      .featured {
        margin-right: 2px;
        font-weight: 500;
        font-size: 14px;
        opacity: 0.72;
      }

      .sub-title {
        color: #7a7a7a;
        opacity: 0.7;
        margin-left: 4px;
      }
    }

    .artist {
      margin-top: 2px;
      font-size: 13px;
      opacity: 0.68;
      color: var(--color-text);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;

      a {
        span {
          margin-right: 3px;
          opacity: 0.8;
        }

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  .album {
    flex: 1;
    display: flex;
    font-size: 16px;
    opacity: 0.88;
    color: var(--color-text);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .time,
  .count {
    font-size: 16px;
    width: 50px;
    cursor: default;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    font-variant-numeric: tabular-nums;
    opacity: 0.88;
    color: var(--color-text);
  }

  .count {
    font-weight: bold;
    font-size: 22px;
    line-height: 22px;
  }
}

.track.focus {
  transition: all 0.3s;
  background: var(--color-secondary-bg);
}


.track.disable {
  img {
    filter: grayscale(1) opacity(0.6);
  }

  .title,
  .artist,
  .album,
  .time,
  .no,
  .featured {
    opacity: 0.28 !important;
  }

  &:hover {
    background: none;
  }
}

.track.tracklist {
  img {
    height: 36px;
    width: 36px;
    border-radius: 6px;
    margin-right: 14px;
    cursor: pointer;
  }

  .title {
    font-size: 16px;
  }

  .artist {
    font-size: 12px;
  }
}

.track.album {
  height: 32px;
}

.actions {
  width: 80px;
  display: flex;
  justify-content: flex-end;
}

.track.playing {
  background: var(--color-primary-bg);
  color: var(--color-primary);

  .title,
  .album,
  .time,
  .title-and-artist .sub-title {
    color: var(--color-primary);
  }

  .title .featured,
  .artist,
  .explicit-symbol,
  .count {
    color: var(--color-primary);
    opacity: 0.88;
  }

  .no span {
    color: var(--color-primary);
    opacity: 0.78;
  }
}
</style>
