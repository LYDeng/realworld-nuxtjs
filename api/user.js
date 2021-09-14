/*
 * @Date: 2021-09-13 09:09:26
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-14 13:31:01
 * @Description: 无
 */
import { request } from '@/plugins/request'

//用户登录
export const login = data => {
  return request({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

//用户注册
export const register = data => {
  return request({
    method: 'post',
    url: '/api/users',
    data
  })
}

//获取当前用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/api/user',
  })
}

//获取当前用户信息修改
export const updateUserInfo = data => {
  return request({
    method: 'put',
    url: '/api/user',
    data
  })
}