<template>
  <div>{{ keywords }}</div>
  <div v-show="requestData.artists.length > 0" class="row">
    <div class="artists">
      <div class="section-title">
        <div>艺人</div>
        <router-link to="/">查看全部</router-link>
      </div>
      <CoverRow type="artist" :items="requestData.artists.slice(0, 3)" :columnNumber="3"></CoverRow>
    </div>

    <div v-show="requestData.albums.length > 0" class="albums">
      <div class="section-title">
        <div>专辑</div>
        <router-link to="/">查看全部</router-link>
      </div>
      <CoverRow type="album" :items="requestData.albums.slice(0, 3)" :columnNumber="3" sub-text="artist"
        sub-text-font-size="14px" gap="34px 24px" :play-button-size="26"></CoverRow>
    </div>
  </div>

  <div v-show="requestData.tracks.length > 0" class="tracks">
    <div class="section-title">
      <div>歌曲</div>
      <router-link to="/">查看全部</router-link>
    </div>
    <TrackList :tracks="requestData.tracks"></TrackList>
  </div>

  <div v-show="requestData.videos.length > 0" class="music-videos">
    <div class="section-title">
      <div>视频</div>
      <router-link to="/">查看全部</router-link>
    </div>
    <MvRow :mvs="requestData.videos.slice(0, 5)" />
  </div>

  <div v-show="requestData.playlists.length > 0" class="playlists">
    <div class="section-title">
      <div>歌单</div>
      <router-link to="/">查看全部</router-link>
    </div>
    <CoverRow type="playlist" :items="requestData.playlists.slice(0, 12)" :columnNumber="6" sub-text-font-size="14px"
      gap="34px 24px" :play-button-size="26"></CoverRow>
  </div>
</template>

<script setup lang='ts'>
import { search } from '@/api/others'
import { getTrackDetail } from '@/api/track'
import { useRoute } from 'vue-router';
import { onBeforeMount, reactive, watch, computed } from 'vue'

import CoverRow from '@/components/CoverRow.vue';
import TrackList from '@/components/TrackList.vue';
import MvRow from '@/components/MvRow.vue';

const route = useRoute()
const keywords = computed(() => {
  return route.params.keywords as string ?? ''
})

watch(keywords, (newVal) => {
  if (newVal.length === 0) return;
  getData();
})

const requestData = reactive({
  artists: [],     // 歌星
  albums: [],      // 专辑
  songs: [],       // 歌曲
  tracks: [],
  videos: [],      // 视频
  playlists: []    // 歌单
})
onBeforeMount(() => {
  getData()
})

function getData() {
  // 返回 5 个 promise
  const requests1 = [
    toSearch('视频'),
    toSearch('歌单')
  ]
  const requests2 = [
    toSearch('歌手'),
    toSearch('专辑'),
    toSearch('歌曲')
  ]
  requestAll(requests2)
  requestAll(requests1)
}

// 处理映射类型
type mapObj = {
  [prop: string]: number
}
// type: keyof mapObj 译为 key是 mapObj 的所有属性值之一
async function toSearch(key: keyof mapObj = '综合') {
  // 映射对象
  const mapType: mapObj = {
    ['单曲']: 1,
    ['专辑']: 10,
    ['歌手']: 100,
    ['歌单']: 1000,
    ['用户']: 1002,
    ['MV']: 1004,
    ['歌词']: 1006,
    ['电台']: 1009,
    ['视频']: 1014,
    ['综合']: 1018
  }
  const result: any = await search({
    keywords: keywords.value,
    type: mapType[key],
    limit: 16
  })
  return new Promise((resolve) => {
    resolve({
      result: result.data,
      type: key
    })
  })
}
// 处理所有的请求
async function requestAll(requests: any) {
  const results = await Promise.all(requests)
  results.forEach(item => {
    if (item.result === undefined) return
    switch (item.type) {
      case '歌手':
        requestData.artists = item.result.result.artists ?? []
        break;
      case '专辑':
        requestData.albums = item.result.result.albums ?? []
        break;
      case '歌曲':
        requestData.songs = item.result.result.songs ?? []
        toGetTrackDetail()
        break;
      case '视频':
        requestData.videos = item.result.result.videos ?? []
        // console.log(requestData.videos,'requestData.videos');
        break;
      case '歌单':
        requestData.playlists = item.result.result.playlists ?? []
        break;
    }
  })
}

// 获取歌曲详细信息
async function toGetTrackDetail() {
  const trackIDs = requestData.songs.map((item: any) => item.id)
  if (trackIDs.length === 0) return
  const result = await getTrackDetail(trackIDs.join(',')) as any
  requestData.songs = result.songs
  requestData.tracks = requestData.songs
}

// 我的promiseAll
const Promise_Myall = function (promises: any[]) {
  return new Promise((resolve, reject) => {
    let result: any[] = []
    promises.forEach((promise: any, index: number) => {
      Promise.resolve(promise).then((val: any) => {
        result[index] = val
        Object.keys(result).length === promises.length ? resolve(result) : ''
      }).catch((err: any) => {
        reject(err)
      })
    })
  })
}



</script>
<style lang="scss" scoped>
.section-title {
  font-weight: 600;
  font-size: 22px;
  opacity: 0.88;
  color: var(--color-text);
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.68;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;

  .artists {
    flex: 1;
    margin-right: 8rem;
  }

  .albums {
    flex: 1;
  }
}

.tracks,
.music-videos,
.playlists {
  margin-top: 46px;
}

.no-results {
  position: absolute;
  top: 64px;
  right: 0;
  left: 0;
  bottom: 64px;
  font-size: 24px;
  color: var(--color-text);
  opacity: 0.38;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  .svg-icon {
    height: 24px;
    width: 24px;
    margin-right: 16px;
  }
}</style>
