import Cookie from 'js-cookie';

export const setCookie = (key: string) => {
    const cookies = key.split(';;');
    cookies.forEach((cookie) => {
        document.cookie = cookie;
        const cookieKeyValue = cookie.split(';')[0].split('=')
        localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1])
    })
}


export const getCookie = (key: string) => {
    return Cookie.get(key) ?? localStorage.getItem(`cookie-${key}`)
}


export const remoteCookie = (key: string) => {
    Cookie.remove(key)
    localStorage.removeItem(`cookie-${key}`)
}

// MUSIC_U 只有在账户登录的情况下才有
export const isLoggedIn = () => {
    return getCookie('MUSIC_U') ?? false;
}