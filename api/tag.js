/*
 * @Date: 2021-09-13 10:52:05
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-13 15:14:27
 * @Description: 获取文章标签列表
 */
import { request } from '@/plugins/request'


export const getTags  = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}