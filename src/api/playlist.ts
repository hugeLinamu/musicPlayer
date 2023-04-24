import request from '@/utils/require';
import exp from 'constants';

//推荐歌单接口
interface recommendPlayListParams {
    limit?: number;
}

// 歌单 ( 网友精选碟 )
interface toPlaylistParams {
    order?: 'hot' | 'new',
    cat?: string,
    limit?: number,
    offset?: number
}

// 获取精品歌单
interface highQualityPlaylistParams{
    cat?:string,
    limit?:number,
    before?:number | string
}
/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * - 可选limit: 取出数量 , 默认为 30 (不支持 offset)
 * - 调用例子 : /personalized?limit=1
 * @param {Object} params
 * @param {number=} params.limit
 */
export const recommendPlayList = (params?: recommendPlayListParams) => {
    return request({
        url: 'personalized',
        method: 'get',
        params
    })
}



/**
 * 所有榜单
 * 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
 */
export function toplists() {
    return request({
        url: '/toplist',
        method: 'get',
    });
}

/**
 * 歌单 ( 网友精选碟 )
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * - order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * - limit: 取出歌单数量 , 默认为 50
 * @param {Object} params
 * @param {string} params.order
 * @param {string} params.cat
 * @param {number=} params.limit
 */
export function toPlaylist(params: toPlaylistParams) {
    return request({
        url: '/top/playlist',
        method: 'get',
        params
    })
}

/**
 * 获取精品歌单
 * 说明 : 调用此接口 , 可获取精品歌单
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * - limit: 取出歌单数量 , 默认为 20
 * - before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @param {Object} params
 * @param {string} params.cat
 * @param {number=} params.limit
 * @param {number} params.before
 */
export function highQualityPlaylist(params?:highQualityPlaylistParams){
    return request({
        url: '/top/playlist/highquality',
        method: 'get',
        params
    })
}