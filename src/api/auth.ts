import request from "@/utils/require"

// 二维码生成接口
interface loginQrCodeCreateParams {
    key: string,
    qrimg?: string
}

// 手机登录接口
interface loginWithPhoneParams {
    phone: number,  // 手机号码
    password: string,   // 密码
    countrycode?: string,    // 国家码，用于国外手机号登录，例如美国传入：1
    md5_password?: string,   // md5加密后的密码,传入后 password 将失效
    captcha?: string,    // 验证码 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效
}

// 邮箱登录接口
interface loginWithEmailParams {
    email: string,           // 163 网易邮箱
    password: string,        // 密码
    md5_password?: string,   // md5加密后的密码,传入后 password 将失效
}



/**
 * 二维码key生成接口
 * 调用务必带上时间戳,防止缓存
 */
export const loginQrCodeKey = () => {
    return request({
        url: '/login/qr/key',
        method: 'get',
        params: {
            timestamp: new Date().getTime()
        }
    })
}


/**
 * 二维码生成接口
 * 说明: 调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,
 * 可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生产库渲染二维码
 * @param {Object} params
 * @param {string} params.key
 * @param {string} params.qrimg 传入后会额外返回二维码图片base64编码
 */
export const loginQrCodeCreate = (param: loginQrCodeCreateParams) => {
    return request({
        url: '/login/qr/create',
        method: 'get',
        params: {
            ...param,
            timestamp: new Date().getTime()
        }
    })
}


/**
 *  /二维码检测接口
 * 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功
 * (803 状态码下会返回 cookies),其他状态码为二维码扫码失败
 *  @param {string} key 由第一个接口生成的key
 * 
 */
export const loginQrCodeCheck = (key: string) => {
    return request({
        url: '/login/qr/check',
        method: 'get',
        params: {
            key,
            timestamp: new Date().getTime()
        }
    })
}


/**
 * 手机登录
 * - phone: 手机号码
 * - password: 密码
 * - countrycode: 国家码，用于国外手机号登录，例如美国传入：1
 * - md5_password: md5加密后的密码,传入后 password 将失效
 * @param {Object} params
 * @param {string} params.phone
 * @param {string} params.password
 * @param {string=} params.countrycode
 * @param {string=} params.md5_password
 */
export const loginWithPhone = (params:loginWithPhoneParams) => {
    return request({
        url: '/login/cellphone',
        method: 'get',
        params
    })
}


/**
 * 邮箱登录
 * - email: 163 网易邮箱
 * - password: 密码
 * - md5_password: md5加密后的密码,传入后 password 将失效
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string=} params.md5_password
 */
export const loginWithEmail = (params:loginWithEmailParams) => {
    return request({
        url: '/login',
        method: 'get',
        params
    })
}


/**
 * 刷新登录
 * 说明 : 调用此接口 , 可刷新登录状态
 * - 调用例子 : /login/refresh
 */
export function refreshCookie() {
    return request({
      url: '/login/refresh',
      method: 'post',
    });
  }


/**
 * 退出登录
 * 说明 : 调用此接口 , 可退出登录
 */
export const logout = () => {
    return request({
        url: '/logout',
        method: 'get'
    })
}