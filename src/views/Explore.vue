<template>
  <h1>发现</h1>
  <div class="buttons">
    <div @click="acitveButton(item)" :class="{ active: activeCategory === item }" class="button"
      v-for="item in useSetting.settings.enabledPlaylistCategories" :key="item">
      {{ item }}
    </div>
    <div :class="{ active: activeCategory === 'more' }" @click=handleMore class="button more">
      <svg-icon icon-class="more"></svg-icon>
    </div>
  </div>
  <div class="panel" v-show="showMore">
    <div class="big-cat" v-for="(category, key) of allCategories" :key="key">
      <div class="name">{{ key }}</div>
      <div class="cats">
        <div class="cat" :class="{ active: useSetting.settings.enabledPlaylistCategories.includes(val) }"
          v-for="val in category" :key="val">
          <span @click="handleCat(val)">{{ val }}</span>
        </div>
      </div>
    </div>
  </div>

  <CoverRow type="playlist" :items="playlist.toPlaylist" :sub-text="subText"></CoverRow>

  <button @click="loaderMore" v-show="hasMore">加载更多</button>
</template>

<script setup lang='ts'>
import { useSettingStore } from '@/store/index'
import { toPlaylist, highQualityPlaylist, toplists } from '@/api/playlist'
import { playlistCategories } from '@/utils/staticData'
import { getRecommendPlayList } from '@/utils/palyList'
import type { Categorie } from '@/utils/staticData'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

import CoverRow from '@/components/CoverRow.vue'

const router = useRouter()
const route = useRoute()
const useSetting = useSettingStore()

// 展开图标里面的内容进行分类处理
const allCategories = computed(() => {
  let allcategories = {} as any
  // 展开图标里面的内容进行分类处理
  playlistCategories.forEach((item: Categorie) => {
    if (item.bigCat !== 'static') {
      allcategories[item.bigCat] ? allcategories[item.bigCat].push(item.name) :
        (allcategories[item.bigCat] = [], allcategories[item.bigCat].push(item.name))
    }
  })
  return allcategories
})

// 展示列表
const playlist = reactive<any>({
  toPlaylist: []
})
const activeCategory = ref('全部')

const subText = computed(() => {
  if (activeCategory.value === '排行榜') return 'updateFrequency';
  if (activeCategory.value === '推荐歌单') return 'copywriter';
  return 'none';
})


// 激活类别
function acitveButton(item: string) {
  activeCategory.value = item
  showMore.value = false
  router.push({
    name: 'Explore',
    query: {
      category: item
    }
  })
}

const showMore = ref<boolean>(false)
function handleMore() {
  activeCategory.value = 'more'
  showMore.value = !showMore.value
}

function handleCat(item: string) {
  // 向类别中添加或删除内容
  useSetting.togglePlaylistCategory(item)
}

// 更新playList数据
function updatePlayList(playLists: any) {
  playlist.toPlaylist = [...playlist.toPlaylist, ...playLists]
}

// 推荐歌单
async function togetRecommendPlayList() {
  console.log(activeCategory.value, 'activeCategory.value 推荐歌单');
  const result = await getRecommendPlayList({
    limit: 100
  })
  updatePlayList(result)
}
// 精品歌单
async function getHighQualityPlaylist() {
  const before =
    playlist.toPlaylist.length !== 0 ? playlist.toPlaylist[playlist.toPlaylist.length - 1].updateTime : 0
  console.log(activeCategory.value, 'activeCategory.value 精品歌单');
  console.log(before,"before");
  const result = await highQualityPlaylist({
    limit:50,
    before
  })
  updatePlayList(result.data.playlists)
  hasMore.value = result.data.more
}

// 排行榜
async function getTopLists() {
  const result = await toplists()
  updatePlayList(result.data.list)
  hasMore.value = result.data.more
}

// 获得对应类别的数据
async function getTopPlayList() {
  const result = await toPlaylist({
    cat: activeCategory.value,
    offset: playlist.toPlaylist.length,
    limit: 50
  })
  updatePlayList(result.data.playlists)
  hasMore.value = result.data.more
}

// 获得类别数据
function getPlayList() {
  let flag: number = 0
  // 映射函数
  const mapObj = {
    '推荐歌单': togetRecommendPlayList,
    '精品歌单': getHighQualityPlaylist,
    '排行榜': getTopLists
  } as any
  // 如果 activeCategory 值是以上几个关键词之一, 调用对应的函数请求数据
  Object.keys(mapObj).forEach((key: string) => {
    if (key === activeCategory.value) {
      mapObj[key]()
      flag = 1
    }
  })
  // 如果不是 , 则调用其他接口，获得对应类别的数据
  flag === 0 ? getTopPlayList() : ''
}


const hasMore = ref<boolean>(false)
// 加载更多，再次调用请求，需要在请求的时候设置 offset偏移量
function loaderMore() {
  getPlayList()
}

onBeforeMount(() => {
  route.query.category ? (activeCategory.value = route.query.category as string) : (activeCategory.value = '全部')
  getPlayList()
})

onBeforeRouteUpdate((to, from) => {
  playlist.toPlaylist = []
  getPlayList()
})


</script>

<style scoped lang="scss">
h1 {
  color: var(--color-text);
  font-size: 56px;
}

.buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .button {
    user-select: none;
    cursor: pointer;
    padding: 8px 16px;
    margin: 10px 16px 6px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    border-radius: 10px;
    background-color: var(--color-secondary-bg);
    color: var(--color-secondary);
    transition: 0.2s;

    &:hover {
      background-color: var(--color-primary-bg);
      color: var(--color-primary);
    }
  }

  .button+.button::before {
    content: "";
  }

  .button.active {
    background-color: var(--color-primary-bg);
    color: var(--color-primary);
  }
}

.button.more {
  .svg-icon {
    height: 24px;
    width: 24px;
  }
}

.panel {
  margin-top: 10px;
  background: var(--color-secondary-bg);
  border-radius: 10px;
  padding: 8px;
  color: var(--color-text);

  display: flex;
  flex-direction: column;

  .big-cat {
    display: flex;
    // flex-direction: row;
    margin-bottom: 32px;

    .name {
      font-size: 24px;
      font-weight: 700;
      opacity: 0.68;
      margin-left: 24px;
      min-width: 54px;
      height: 26px;
      margin-top: 8px;
    }

    .cats {
      margin-left: 24px;
      display: flex;
      flex-wrap: wrap;
    }

    .cat {
      user-select: none;
      margin: 4px 0px 0 0;
      display: flex;
      // justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 16px;
      transition: 0.2s;
      min-width: 98px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 6px 12px;
        height: 26px;
        border-radius: 10px;
        opacity: 0.88;

        &:hover {
          opacity: 1;
          background-color: var(--color-primary-bg);
          color: var(--color-primary);
        }
      }
    }

    .cat.active {
      color: var(--color-primary);
    }

  }

}
</style>