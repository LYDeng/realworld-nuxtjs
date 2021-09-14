/*
 * @Date: 2021-09-13 15:58:14
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-13 16:06:29
 * @Description: 全局封装成dayjs过滤器
 */
import vue from 'vue'
import dayjs from 'dayjs'

vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})