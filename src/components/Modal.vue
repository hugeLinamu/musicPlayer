<template>
    <div class="fade" v-show="showModal">
        <div class="modal" tabindex="-1" @blur="handleClose" ref="modalDom">
            <div class="header">
                <div class="title">{{ props.title }}</div>
                <div class="close" @click="handleClose">
                    <svg-icon icon-class="x" />
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div v-if="props.showFooter" class="footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, withDefaults, nextTick } from 'vue'
interface ModalProps {
    title: string
    showFooter?: boolean
}
const props = withDefaults(defineProps<ModalProps>(), {
    showFooter: false
})

const showModal = ref(false)


function handleClose() {
    showModal.value = false
}

const modalDom = ref<HTMLElement | null>(null)
function handleOpen() {
    showModal.value = true
    nextTick(() => {
        modalDom.value?.focus()
    })

}

defineExpose({
    handleClose,
    handleOpen
})
</script>

<style scoped lang="scss">
.fade {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;

    .modal {
        border: 0;
        background-color: #fff;
        width: 700px;
        border-radius: 10px;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            height: 50px;

            .title {
                font-size: 20px;
                font-weight: 700;
            }

            .close {
                cursor: pointer;

                .svg-icon {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .content {
            line-height: 16px;
            padding: 20px;
            font-size: 16px;
        }
    }
    :focus {
        outline: 0;
    }
}

.footer {
    padding-top: 16px;
    margin: 16px 24px 24px 24px;
    border-top: 1px solid rgba(128, 128, 128, 0.18);
    display: flex;
    justify-content: flex-end;
    margin-bottom: -8px;

    button {
        color: var(--color-text);
        background: var(--color-secondary-bg-for-transparent);
        border-radius: 8px;
        padding: 6px 16px;
        font-size: 14px;
        margin-left: 12px;
        transition: 0.2s;

        &:active {
            transform: scale(0.94);
        }
    }

    button.primary {
        color: var(--color-primary-bg);
        background: var(--color-primary);
        font-weight: 500;
    }

    button.block {
        width: 100%;
        margin-left: 0;

        &:active {
            transform: scale(0.98);
        }
    }
}

[data-theme='dark'] {
    .fade {
        background: rgba(0, 0, 0, 0.38);
        color: var(--color-text);
    }

    .modal {
        background: rgba(36, 36, 36, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
}
</style>
