import request from "@/utils/require"
import { mapTrackPlayableStatus } from '@/utils/common'

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * @param {string} ids - 音乐 id, 例如 ids=405998841,33894312
 */
export const getTrackDetail = (ids: number | string) => {
    
    return new Promise((resolve) => {
        request({
            url: '/song/detail',
            method: 'get',
            params: {
                ids
            }
        }).then((val: any) => {
            val.songs = mapTrackPlayableStatus(val.data.songs, val.data.privileges)
            resolve(val)
        })
    })
}