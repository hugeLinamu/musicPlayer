import request from '@/utils/require'


/**
 * 歌手榜
 * 说明 : 调用此接口 , 可获取排行榜中的歌手榜
 * - type : 地区
 * 1: 华语
 * 2: 欧美
 * 3: 韩国
 * 4: 日本
 * @param {number=} type
 */
export const getToplistOfArtists = (type?: number) => {
    let params = {}
    if (type) {
        Object.defineProperty(params, 'type', {
            value: type
        })
    }
    return request({
        url: 'toplist/artist',
        method: 'get',
        params
    })
}