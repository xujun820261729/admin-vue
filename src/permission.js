/**
 * 校验用户登陆的钩子-router.beforeEach
 * 1. meta 只有在路由中设置了meta auto属性为true的才判断，以上路由全部由设置
 * 2. to 为向后走的路由对象，包括路由的完整信息
 * 3. from 为从哪跳来的路由对象
 * 4. next() 控制路由向下走，重新定义路由跳转的路由next(‘路由路径)
 * 
*/

import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 加载的进度条
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 关闭加载时的循环loading

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
    // 开启进度条
    NProgress.start()

    // 设置title
    document.title = getPageTitle(to.meta.title)

    // 获取存在cookie的token值判断
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 如果时login,重定向地址
            next({ path: '/' })
            NProgress.done()
        } else {
            // 从store 中获取 roles 数据,如果存在则不需要重复获取，当前页面不需要刷新
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // 获取用户信息
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const { roles } = await store.dispatch('user/getInfo')

                    // 根据获取的 roles 重新获取路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    // 动态添加路由
                    router.addRoutes(accessRoutes)

                    // 确保addroutes完整的hack方法
                    // 设置replace:true，这样导航就不会留下历史记录
                    next({ ...to, replace: true })
                } catch (error) {
                    // 出现异常,删除token值,跳转到login页面
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
    /* 没有 token 时*/

        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单的用户,不控制跳转
            next()
        } else {
            // 非白名单的用户切换到login页面
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // 最后关闭加载条
    NProgress.done()
})
