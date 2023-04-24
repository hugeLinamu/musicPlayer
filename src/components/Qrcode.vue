<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang='ts'>
import QRCode from 'qrcode'
import { onUpdated, ref, defineProps } from 'vue';

/*
  纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。
  通常情况下二维码分为 4 个纠错级别：L级 可纠正约 7% 错误、M级 可纠正约 15% 错误、Q级 可纠正约 25% 错误、H级 可纠正约30% 错误。
  并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。
  当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。
*/
interface Props {
    value: string,                                   // 二维码的内容值。
    size?: number,                                   // 二维码大小。
    margin?: number,                                 // 定义空白区的宽度应该是多少。
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H',    // 维码的容错能力等级，取值为 'L', 'M', 'Q', 'H' 之一。
    dark?: string,                                   // 二维码前景颜色。
    light?: string,                                  // 二维码背景颜色。
}

const props = withDefaults(defineProps<Props>(), {
    value: '',
    size: 200,
    margin: 5,
    level: 'M',
    light: '#fff',
    dark: '#000',
})

const canvas = ref<HTMLCanvasElement | null>(null)


onUpdated(() => {
    const canvasDom = canvas.value as HTMLCanvasElement
    QRCode.toCanvas(canvasDom, props.value, {
        errorCorrectionLevel: props.errorCorrectionLevel,
        width: props.size,
        margin: props.margin,
        color: {
            dark: props.dark,
            light: props.light
        }
    }, (error: any) => {
        if (error) console.error(error)
    })
})


</script>

<style scoped lang="scss"></style>
