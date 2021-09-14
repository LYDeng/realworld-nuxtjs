/*
 * @Date: 2021-09-13 09:09:26
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-14 14:59:12
 * @Description: 无
 */
import { request } from '@/plugins/request'

//获取公共的文章列表
export const getArticles  = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

//获取我关注的文章列表
export const getFeedArticles  = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: ``
    // }
  })
}

//文章点赞
export const addFavorite  = slug => {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`,
  })
}
//文章取消点赞
export const deleteFavorite  = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

//获取文章详情
export const getArticlesDetil  = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
// 创建文章
export const createArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}
// 更新文章
export const updateArticle = data => {
  return request({
    method: 'PUT',
    url: `/api/articles/${data.slug}`,
    data
  })
}