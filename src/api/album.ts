import request from '@/utils/require'
import { resolve } from 'path';

// 全部新碟
interface NewAlbumsParams {
    limit?: number;
    offset?: number;
    area?: string;
}

/**
 * 全部新碟
 * 说明 : 登录后调用此接口 ,可获取全部新碟,三个可选参数,分别为 limit, offset, area
 * - limit - 返回数量 , 默认为 30
 * - offset - 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * - area - ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @param {Object} params
 * @param {number} params.limit
 * @param {number=} params.offset
 * @param {string} params.area
 */
export const getNewAlbums = (params?: NewAlbumsParams) => {
    return request({
        url: '/album/new',
        method: 'get',
        params
    })
}