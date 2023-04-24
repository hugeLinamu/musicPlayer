
<template>
  <div class="app">
      <Navbar/>
      <main>
        <router-view></router-view>
      </main>
      <Lyrics></Lyrics>
      <Toast></Toast>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Lyrics from './components/Lyrics.vue';
import Toast from './components/Toast.vue';
</script>

<style  lang="scss" >
.app {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10vw;
  height: 100vh;
}
main{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  padding: 64px 10vw 96px 10vw;
  box-sizing: border-box;
  scrollbar-width: none; // firefox
}
</style>
