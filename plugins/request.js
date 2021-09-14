/*
 * @Date: 2021-09-13 14:59:26
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-13 15:28:16
 * @Description: 插件
 */
import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com/' //基础路径
})
//通过插件机制获取上下文例如（query,params,req,res,app,store）
//插件导出函数必须作为default成员
export default ({ store }) => {
  // 添加请求拦截器
  // 做公告业务例如统一token请求
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    //返回config 请求配置对象
    return config;
  }, function (error) {
    // 对请求错误做些什么（未发出请求）
    return Promise.reject(error);
  });
}
