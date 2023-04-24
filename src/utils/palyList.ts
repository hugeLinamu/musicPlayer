import { recommendPlayList } from '@/api/playlist'

const isLogin = () => {
    return false;
}

// getRecommendPlayList是获取推荐歌单的方法
interface recommendPlayListParams {
    limit?: number;
}
export const getRecommendPlayList = async (params?: recommendPlayListParams) => {
    // 如果用户已经登陆
    if (isLogin()) {

    } else {    // 还没登陆
        const res = await recommendPlayList(params)
        return res.data.result
    }
}






