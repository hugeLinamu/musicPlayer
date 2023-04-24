<template>
  <div class="login">
    <div class="login-container">
      <div class="img">
        <img src="@/assets/images/netease-music.png" alt="">
      </div>
      <div class="title">登录网易云账号</div>
      <div class="section">
        <!-- 手机登录 -->
        <div v-show="mode === 'mobile'" class="input-box" :class="{ active: inputFocus === 'mobile' }">
          <svg-icon icon-class="mobile"></svg-icon>
          <input type="text" id="countryCode" placeholder="+86" readonly @click="inputFocus = 'mobile'"
            @blur="inputFocus = ''">
          <input type="text" id="phoneNumber" v-model="inputPhoneNumber"
            :placeholder="inputFocus === 'mobile' ? '' : '手机号'" @click="inputFocus = 'mobile'"
            @blur="handleBlur('mobile')" @keyup.enter="login">
        </div>
        <!-- 邮箱  -->
        <div v-show="mode === 'email'" class="input-box" :class="{ active: inputFocus === 'email' }">
          <svg-icon icon-class="mail"></svg-icon>
          <input type="email" v-model="inputEmaid" :placeholder="inputFocus === 'email' ? '' : '邮箱'"
            @click="inputFocus = 'email'" @blur="handleBlur('email')" @keyup.enter="login">
        </div>
        <!-- 密码 -->
        <div v-show="mode !== 'qrCode'" class="input-box" :class="{ active: inputFocus === 'password' }">
          <svg-icon icon-class="lock"></svg-icon>
          <input type="password" v-model="inputPassword" :placeholder="inputFocus === 'password' ? '' : '密码'"
            @click="inputFocus = 'password'" @blur="handleBlur('password')" @keyup.enter="login">
        </div>
        <!-- 登录按钮 -->
        <div v-show="mode !== 'qrCode'" class="input-box login-btn" @click="login">
          <button>登录</button>
        </div>

        <!-- 二维码登录 -->
        <div v-show="mode === 'qrCode'">
          <div class="qr-code-container">
            <Qrcode v-bind="QRStyle"></Qrcode>
          </div>
          <div class="qr-code-info">{{ qrCodeInformation }}</div>
        </div>
      </div>
      <!-- 其他登录方式 -->
      <div class="other-login">
        <div class="other-login-title">
          <a href="javascript:;" v-show="mode !== 'email'" @click="changeMode('email')">邮箱登录</a>
          <span v-show="mode === 'qrCode'">|</span>
          <a href="javascript:;" v-show="mode !== 'mobile'" @click="changeMode('mobile')">手机号登录</a>
          <span v-show="mode !== 'qrCode'">|</span>
          <a href="javascript:;" v-show="mode !== 'qrCode'" @click="changeMode('qrCode')">二维码登录</a>
        </div>
      </div>

      <div class="notice" v-show="mode !== 'qrCode'">
        YesPlayMusic 承诺不会保存你的任何账号信息到云端。
        你的密码会在本地进行 MD5 加密后再传输到网易云 API。
        YesPlayMusic 并非网易云官方网站，输入账号信息前请慎重考虑。 你也可以前往 YesPlayMusic 的 GitHub 源代码仓库 自行构建并使用自托管的网易云 API。
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import md5 from 'js-md5'
import { setCookie } from '@/utils/auth'
import { useDataStore } from '@/store/index'
import { useRouter } from 'vue-router'
import { ref, onBeforeMount, reactive, watch, onBeforeUnmount } from 'vue'
import {
  loginQrCodeKey,
  loginQrCodeCreate,
  loginQrCodeCheck,
  loginWithPhone,
  loginWithEmail
} from '@/api/auth'
import Qrcode from '@/components/Qrcode.vue'


const router = useRouter()
const useData = useDataStore()
const qrCodeInformation = ref<string>('打开网易云音乐APP扫码登录')
// 不同模式登录 手机号码 | 邮箱 | 二维码
type Mode = 'mobile' | 'email' | 'qrCode'
const mode = ref<Mode>('qrCode')
// 输入框聚焦
const inputFocus = ref<string>('')
// 判断是否通过验证
const process = ref<boolean>(false)

// 二维码样式
const QRStyle = reactive({
  value: '',  // 生成二维码的字符串
  width: '200px',
  height: '200px',
  margin: 0,
  dark: '#335eea',
  light: '#00000000',
})

onBeforeMount(() => {
  // 获得二维码
  generateQRCode()
})

const inputPhoneNumber = ref<number>()
const inputEmaid = ref<any>()
const inputPassword = ref<any>()
// 失去焦点
function handleBlur(validate: 'mobile' | 'email' | 'password') {
  inputFocus.value = ''
  if (validate === 'mobile') {
    validatePhone(inputPhoneNumber.value!)
  } else if (validate === 'email') {
    validateEmail(inputEmaid.value!)
  } else if (validate === 'password') {
    validatePassword(inputPassword.value!)
  }
}
function validatePhone(phone: number) {
  const reg = /^1[3456789]\d{9}$/
  if (!phone) return false
  const phoneString = phone.toString()
  console.log(reg.test(phoneString), "phone");
  return reg.test(phoneString)
}
function validateEmail(email: string) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  console.log(reg.test(email), "email");
  return reg.test(email)
}
function validatePassword(password: string) {
  if (!password) return false
  const reg = /^[a-zA-Z0-9_-]{6,16}$/
  if (reg.test(password)) {
    return true
  } else {
    process.value = false
    return false
  }
}

// 登录
async function login() {
  if (mode.value === 'mobile') {
    if (!validatePhone(inputPhoneNumber.value!)) return false
    if (!validatePassword(inputPassword.value!)) return false
    const md5Password = md5(inputPassword.value).toString()
    // 账号密码验证通过 请求登录
    const result = await loginWithPhone({
      phone: inputPhoneNumber.value!,
      password: inputPassword.value!,
      md5_password: md5Password
    })
    handleLoginRespon(result)

  } else if (mode.value === 'email') {
    if (!validateEmail(inputEmaid.value!)) return false
    if (!validatePassword(inputPassword.value!)) return false
    const md5Email = md5(inputEmaid.value).toString()
    // 邮箱密码验证通过 请求登录
    const result = loginWithEmail({
      email: inputEmaid.value!,
      password: inputPassword.value!,
      md5_password: md5Email
    })
    handleLoginRespon(result)
  }
}

async function handleLoginRespon(data: any) {
  if (!data.code) return
  if (data.code === 200) {
    setCookie(data.cookie)
    // 登录成功 , 修改 pinia的 登录方式, 获取账号信息 , 跳转到Library
    useData.updataData("loginMode", mode.value)
    await useData.fetchUserProfile()
    await useData.fetchLikedPlaylist()
    router.push({
      name: 'Library'
    })
  } else {
    // 登录失败
    console.warn('登陆失败')
  }
}

// 获得二维码
async function generateQRCode() {
  const getKey = await loginQrCodeKey()
  const key: string = getKey.data.data.unikey
  const result = await loginQrCodeCreate({ key })   // 请求得到二维码的字符串
  QRStyle.value = result.data.data.qrurl
  checkQrCodeLogin(key)
}

const timer = ref<any>()

// 检查二维码是状态
function checkQrCodeLogin(key: string) {
  timer.value = setInterval(async () => {
    const result = await loginQrCodeCheck(key)
    const data = result.data
    const code = data.code
    // 800 为二维码过期,801 为等待扫码,802 为待确认 ,803 为已确认
    if (code === 800) {
      clearInterval(timer.value)
      generateQRCode()  // 重新生成QrCode 
      qrCodeInformation.value = '二维码已失效，请重新扫码'
    } else if (code === 801) {
      qrCodeInformation.value = '打开网易云音乐APP扫码登录'
    } else if (code === 802) {
      qrCodeInformation.value = '扫描成功，请在手机上确认登录'
    } else if (code === 803) {
      clearInterval(timer.value)
      qrCodeInformation.value = '登录成功，请稍等...'
      data.code = 200
      // 为什么要设置这个呢？因为网易云的cookie是HTTPOnly的，所以无法通过document.cookie获取，所以这里需要把HTTPOnly去掉
      data.cookie = data.cookie.replace('HTTPOnly', '');
      handleLoginRespon(data)
    }
  }, 1000)
}

// 改变登录方式
function changeMode(whatMode: Mode) {
  mode.value = whatMode
  if (whatMode === 'qrCode') {
    checkQrCodeLogin(QRStyle.value)
  } else {
    clearInterval(timer.value)
  }
}



watch(() => QRStyle.value, (val) => {  // 监听二维码字符串的变化
  QRStyle.value = val
})


onBeforeUnmount(() => {
  clearInterval(timer.value)
})

</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img {
      width: 64px;
      height: 64px;
      padding: 20px;
      margin-bottom: 16px;

      img {
        user-select: none;
        width: 100%;
        height: 100%;
      }
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 48px;
    }

    .section {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .input-box {
      display: flex;
      align-items: center;
      height: 46px;
      width: 300px;
      color: var(--color-text);
      background: var(--color-secondary-bg);
      border-radius: 8px;
      margin-bottom: 16px;
      transition: all .3s;

      .svg-icon {
        width: 18px;
        height: 18px;
        color: #aaaaaa;

        margin: {
          left: 12px;
          right: 6px;
        }
      }

      input {
        width: 85%;
        height: 20px;
        font-size: 20px;
        font-weight: 600;
        background: transparent;
        border: 0;
        color: var(--color-text);
      }

      input::placeholder {
        color: var(--color-text);
        opacity: 0.38;
      }

      input#countryCode {
        flex: 3;
      }

      input#phoneNumber {
        flex: 12;
        padding-right: 15px;
      }

      &.active {
        background: var(--color-primary-bg);

        input,
        .svg-icon {
          color: var(--color-primary);
        }
      }
    }

    .input-box.login-btn {

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      margin-top: 24px;

      button {

        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
        border-radius: 8px;
        margin-top: 24px;
        transition: 0.2s;
        padding: 8px;
        width: 100%;
        width: 300px;

        &:hover {
          transform: scale(1.06);
        }

        &:active {
          transform: scale(0.94);
        }
      }

      &:hover {
        transform: scale(1.06);
      }

      &:active {
        transform: scale(0.94);
      }
    }

    .other-login {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: var(--color-text);
      opacity: 0.68;

      a {
        padding: 0 8px;
      }
    }

    .notice {
      width: 300px;
      border-top: 1px solid rgba(128, 128, 128);
      margin-top: 48px;
      padding-top: 12px;
      font-size: 12px;
      color: var(--color-text);
      opacity: 0.48;
    }

    // 二维码
    .qr-code-container {
      background-color: var(--color-primary-bg);
      padding: 24px 24px 21px 24px;
      border-radius: 1.25rem;
      margin-bottom: 12px;
    }

    .qr-code-info {
      color: var(--color-text);
      text-align: center;
      margin-bottom: 28px;
    }
  }
}
</style>
