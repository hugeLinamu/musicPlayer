import { isLoggedIn } from './auth'


// 处理特权
export const isTrackPlayable = (track: any) => {
    let result = {
        playable: true,
        reason: '',
    }
    if (track?.privilege?.pl > 0) {
        return result;
    }
    if (isLoggedIn() && track?.privilege?.cs) {
        return result;
    }
    if (isLoggedIn() && track?.privilege?.cs) {
        return result;
    }
    if (track.fee === 1 || track.privilege?.fee === 1) {
        // if (isLoggedIn() && store.state.data.user.vipType === 11) {
        if (isLoggedIn()) {
            result.playable = true;
        } else {
            result.playable = false;
            result.reason = 'VIP Only';
        }
    } else if (track.fee === 4 || track.privilege?.fee === 4) {
        result.playable = false;
        result.reason = '付费专辑';
    } else if (
        track.noCopyrightRcmd !== null &&
        track.noCopyrightRcmd !== undefined
    ) {
        result.playable = false;
        result.reason = '无版权';
    } else if (track.privilege?.st < 0 && isLoggedIn()) {
        result.playable = false;
        result.reason = '已下架';
    }
    return result
}



// 处理搜索过后获取过来的歌曲的结果， 给 tracks 追加属性
export const mapTrackPlayableStatus = (tracks: any[], previleges = []) => {
    if (tracks?.length === undefined) return tracks
    return tracks.map((item: any) => {
        const previlege = previleges.find((i: any) => i.id === item.id) || {}
        // 有没有特权
        if (item.previlege) {
            Object.assign(item.previlege, previlege)
        } else {
            item.previlege = previlege
        }
        let result = isTrackPlayable(item)
        item.playable = result.playable
        item.reason = result.reason
        return item
    })
}


// 格式化图片
export const resizeImage = (url: string, size: number = 512) => {
    if (!url) return ''
    // url = url.replace('http', 'https') 不能直接使用http 替换为https 因为如果是 https 就会变成 httpss
    const protocol = url.slice(0, 5)
    if (protocol !== 'https') {
        url = protocol + url.slice(4)
    }
    return url + '?param=' + size + 'y' + size
}


// 用代码写一个formatTime函数
export const formatTime = (time: number) => {
    const data = new Date(time)
    const YYYY = data.getFullYear()
    const MM = data.getMonth() + 1
    const DD = data.getDate()
    const hh = data.getHours()
    const mm = data.getMinutes()
    const ss = data.getSeconds()
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}


