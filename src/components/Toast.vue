<template>
    <transition name="fade">
        <div v-show='useToast.showToast' class="toast">
            {{ useToast.toastText }}
        </div>
    </transition>
</template>

<script setup lang='ts'>
import { useToastStore } from '@/store/index'
const useToast = useToastStore()

</script>

<style scoped lang="scss">
.toast {
    position: fixed;
    top: 64px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(12px);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 6px 12px;
    z-index: 1010;
}

[data-theme='dark'] {
    .toast {
        background: rgba(46, 46, 46, 0.68);
        backdrop-filter: blur(16px) contrast(120%);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
}


</style>