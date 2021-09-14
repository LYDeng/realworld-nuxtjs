/*
 * @Date: 2021-09-14 13:40:41
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-14 15:04:13
 */
import { request } from '@/plugins/request'

//用户中心
export const getProfile = username => {
  return request({
    method: 'get',
    url: `/api/profiles/${username}`,
  })
}
//关注
export const follow = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

//取消关注
export const unfollow = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}