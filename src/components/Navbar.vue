<template>
  <nav>
    <div class="navigation-buttons">
      <button-icon @click="go(-1)"><svg-icon iconClass="arrow-left" /></button-icon>
      <button-icon @click="go(1)"><svg-icon iconClass="arrow-right" /></button-icon>
    </div>
    <div class="navigation-link">
      <router-link to="/" :class="{ active: route.name === 'Home' }">首页</router-link>
      <router-link to="/explore" :class="{ active: route.name === 'Explore' }">发现</router-link>
      <router-link to="/library" :class="{ active: route.name === 'Library' }">音乐库</router-link>
    </div>
    <div class="right-part">
      <div class="search-box">
        <div class="container" :class="{ active: inputFocus }">
          <svg-icon icon-class="search" />
          <div class="input">
            <input ref="searchInput" type="search" :placeholder="inputFocus ? '' : '搜索'" v-model="keywords"
              @keydown.enter="doSearch" @focus="inputFocus = true" @blur="inputFocus = false" />
          </div>
        </div>
      </div>
      <img class="avatar" :src="avatarUrl" loading="lazy" @click="showUserProfileMenu" />
    </div>
  </nav>

  <context-menu v-bind="position" ref="contextMenuDom">
    <div class="item" @click="toSetting">
      <svg-icon icon-class="settings" />
      <span>设置</span>
    </div>
    <div class="item" v-if="!isLooseLoggedIn" @click="toLogin">
      <svg-icon icon-class="login" />
      <span>登录</span>
    </div>
    <div class="item" v-if="isLooseLoggedIn" @click="toLogout">
      <svg-icon icon-class="logout" />
      <span>退出</span>
    </div>
    <div class="item" @click="toGithub">
      <svg-icon icon-class="github" />
      <span>Github仓库</span>
    </div>
  </context-menu>
</template>

<script setup lang='ts'>
import { isLoggedIn} from '@/utils/auth'
import { computed, ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import buttonIcon from './ButtonIcon.vue';
import ContextMenu from './ContextMenu.vue';

const route = useRoute()
const router = useRouter();
let inputFocus = ref<boolean>(false);
let avatarUrl = ref<string>('http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60')

// 前进后退
function go(param: number) {
  [-1, 1].includes(param) ? router.go(param) : console.warn('Invalid param');
}

// 搜索
const keywords = ref<string>('');
function doSearch() {
  if (keywords.value === '') return;
  if (route.name === 'Search' && keywords.value === route.params.keywords) return;
  router.push({
    name: 'Search',
    params: {
      keywords: keywords.value
    }
  })
}

// 点击头像展示菜单
const contextMenuDom = ref<any | null>(null)
const position = reactive({
  x: 0,
  y: 0
})
function showUserProfileMenu(e: any) {
  position.x = e.x
  position.y = e.y
  contextMenuDom.value.openMenu()
}

console.log(isLoggedIn(), 'isLooseLoggedIn');

const isLooseLoggedIn = computed(() => {
  return isLoggedIn()
})

// 跳转到设置页面
function toSetting() {
  router.push({
    name: 'Setting'
  })
}
// 跳转到登录页面
function toLogin() {
  router.push({
    name: 'Login'
  })
}
// 跳转到退出页面
function toLogout() {
  router.push({
    name: 'Home'
  })
}
// 跳转到Github页面
function toGithub() {
  window.open('https://github.com/qier222/YesPlayMusic');
}


</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  padding: {
    right: 10vw;
    left: 10vw;
  }

  backdrop-filter: saturate(180%) blur(20px);
  background-color: var(--color-navbar-bg);
  z-index: 100;
  -webkit-app-region: drag;
}

.navigation-buttons {
  flex: 1;
  display: flex;
  align-items: center;

  .svg-icon {
    height: 24px;
    width: 24px;
  }

  button {
    -webkit-app-region: no-drag;
  }
}

.navigation-link {
  flex: 1;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  justify-content: space-around;

  a {
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
    border-radius: 6px;
    padding: 6px 10px;

    margin: {
      right: 12px;
      left: 12px;
    }

    &:hover {
      background: var(--color-secondary-bg-for-transparent);
    }

    &:active {
      transform: scale(0.92);
      transition: 0.2s;
    }
  }

  a.active {
    color: var(--color-primary);
  }
}

.search {
  .svg-icon {
    height: 18px;
    width: 18px;
  }
}



.search-box {
  display: flex;
  justify-content: flex-end;
  -webkit-app-region: no-drag;

  .container {
    display: flex;
    align-items: center;
    height: 32px;
    background: var(--color-secondary-bg-for-transparent);
    border-radius: 8px;
    width: 200px;
  }

  .svg-icon {
    height: 15px;
    width: 15px;
    color: var(--color-text);
    opacity: 0.28;

    margin: {
      left: 8px;
      right: 4px;
    }
  }

  input {
    font-size: 16px;
    border: none;
    background: transparent;
    width: 96%;
    font-weight: 600;
    margin-top: -1px;
    color: var(--color-text);
  }

  .active {
    background: var(--color-primary-bg-for-transparent);

    input,
    .svg-icon {
      opacity: 1;
      color: var(--color-primary);
    }
  }
}

[data-theme='dark'] {
  .search-box {
    .active {

      input,
      .svg-icon {
        color: var(--color-text);
      }
    }
  }
}

.right-part {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .avatar {
    user-select: none;
    height: 30px;
    margin-left: 12px;
    vertical-align: -7px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-app-region: no-drag;
    -webkit-user-drag: none;

    &:hover {
      filter: brightness(80%);
    }
  }

  .search-button {
    display: none;
    -webkit-app-region: no-drag;
  }
}
</style>