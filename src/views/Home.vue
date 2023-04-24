<template>
  <div class="index-row first-row">
    <div class="title"> by Apple Music </div>
    <CoverRow type="playlist" :items="byAppleMusic" sub-text="by apple Music" :image-size="1024" />
  </div>
  <!-- 推荐歌单 -->
  <div class="index-row">
    <div class="title">
      <span>推荐歌单</span>
      <router-link to="/explore?category='推荐歌单'">查看全部</router-link>
    </div>
    <CoverRow :type="'playlist'" :items="recommendData.playList" />
  </div>

  <!-- 为你推荐 -->
  <div class="index-row">
    <div class="title"> For You </div>
    <div class="for-you-row">
      <DailyTracksCard />
      <FMCard />
    </div>
  </div>

  <div class="index-row">
    <div class="title">推荐艺人</div>
    <CoverRow type="artist" :items="recommendData.artists.items" :columnNumber="6" />
  </div>

  <div class="index-row">
    <div class="title">新专速递</div>
    <CoverRow type="album" :items="recommendData.blums" />
  </div>

  <div class="index-row">
    <div class="title">排行榜
      <router-link to="/explore?category='排行榜'">查看更多</router-link>
    </div>

    <CoverRow type="album" :items="recommendData.topList.items" />
  </div>
</template>
<script setup lang='ts'>
import { onBeforeMount, reactive } from 'vue';
import { byAppleMusic } from '@/utils/staticData';
import { toplists } from '@/api/playlist'
import { getRecommendPlayList } from '@/utils/palyList'
import { getToplistOfArtists } from '@/api/artist'
import { getNewAlbums } from '@/api/album'
import CoverRow from '@/components/CoverRow.vue';
import DailyTracksCard from '@/components/DailyTracksCard.vue';
import FMCard from '@/components/FMCard.vue';


const recommendData = reactive({
  // 推荐歌单
  playList: [],
  // 推荐艺人
  artists: {
    items: [],
    indexs: []
  },
  // 获得全部新碟
  blums: [],
  // 排行榜
  topList: {
    items: [],
    ids: [19723756, 180106, 60198, 3812895, 60131]
  }
})


onBeforeMount(async () => {
  // 获取推荐歌单
  recommendData.playList = await getRecommendPlayList({ limit: 10 })

  // 获取推荐艺人
  const { data } = await getToplistOfArtists()
  const list = data.list.artists
  // q: ~~(Math.random() * 100) 为什么要这样写？
  // a: 为了取整，~~ 为取整运算符
  while (recommendData.artists.items.length < 6) {
    let index = ~~(Math.random() * 100)
    if (!(recommendData.artists.indexs as number[]).includes(index)) {
      ; (recommendData.artists.indexs as any[]).push(index)
        ; (recommendData.artists.items as any[]).push(list[index])
    }
  }

  // 获得全部新碟
  const newAlbumsData = await getNewAlbums({ limit: 10 })
  recommendData.blums = newAlbumsData.data.albums

  // 排行榜
  const toplistsData = await toplists()
  const toplistsDataList = toplistsData.data.list
  recommendData.topList.items = toplistsDataList.filter((item:any) => recommendData.topList.ids.includes(item.id) )
})

</script>

<style scoped lang="scss">
.index-row {
  margin-top: 54px;
}

.index-row.fitst-row {
  margin-top: 32px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);

  a {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.68;
  }
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.for-you-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 78px;
}
</style>
