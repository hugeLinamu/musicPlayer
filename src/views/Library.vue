<template>
  <h1>
    <img src="https://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=512y512" alt="">
    {{ name }}的音乐库
  </h1>
  <div class="section-one">
    <div class="liked-songs">
      <div class="top">
        <p>
          <span>
            
          </span>
        </p>
      </div>
      <div class="bottom">
        <div class="titles">
          <div class="title">

          </div>
          <div class="sub-title">

          </div>
        </div>
        <button>
          <svg-icon icon-class="play" />
        </button>
      </div>
    </div>
    <div class="songs">
      <!-- <TrackList></TrackList> -->
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

import TrackList from '@/components/TrackList.vue'
const name = ref('小林g');




</script>

<style scoped lang="scss">
h1 {
  font-size: 42px;
  color: var(--color-text);
  display: flex;
  align-items: center;

  img {
    height: 44px;
    margin-right: 12px;
    vertical-align: baseline;
    border-radius: 50%;
    border: rgba(0, 0, 0, 0.2);
  }
}

.section-one {
  display: flex;
  margin-top: 24px;

  .songs {
    flex: 7;
    margin-top: 8px;
    margin-left: 36px;
    overflow: hidden;
  }
}

.liked-songs {
  flex: 3;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  box-sizing: border-box;

  background: var(--color-primary-bg);

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-primary);

    .title {
      font-size: 24px;
      font-weight: 700;
    }

    .sub-title {
      font-size: 15px;
      margin-top: 2px;
    }

    button {
      margin-bottom: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 44px;
      width: 44px;
      background: var(--color-primary);
      border-radius: 50%;
      transition: 0.2s;
      box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.2);
      cursor: default;

      .svg-icon {
        color: var(--color-primary-bg);
        margin-left: 4px;
        height: 16px;
        width: 16px;
      }

      &:hover {
        transform: scale(1.06);
        box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.4);
      }

      &:active {
        transform: scale(0.94);
      }
    }
  }

  .top {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    opacity: 0.88;
    color: var(--color-primary);

    p {
      margin-top: 2px;
    }
  }
}
</style>
