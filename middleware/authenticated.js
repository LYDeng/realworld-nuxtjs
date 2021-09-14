/**
 * 验证是否登录的中间件
 * store 容器对象
 * redirect 重定向方法
 */
export default function ({ store, redirect }) { 
  // If the user is not authenticated
  if (!store.state.user) {
    return redirect('/login')
  }
}
