/*
 * @Date: 2021-09-10 15:42:15
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-14 17:03:28
 * @Description: Nuxt.js配置文件
 */
module.exports = {
  router: {
    linkActiveClass: 'active', //全局配置 <nuxt-link> 组件默认的激活类名。默认值： 'nuxt-link-active'
    // 自定义路由表规则
    extendRoutes (routes, resolve) {
      routes.splice(0);
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname,'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}