/**
 * 设计store方法：
 * 1. 管理整个项目时候,统一使用store管理项目的数据,store分解成两个部分：1,modules:各个模块的方法; 2,getters:所有定义在state中的数据。
 * 2. 我们根据菜单的功能分配在modules中,仅仅适合中小项目，如果大型项目使用，则需要拆分多个modules模块统一处理页面数据
*/

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`(你不需要import 获取模块,直接使用node.js中的获取文件的方法获取数组))
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,// 暴露出方法
    getters// 暴露出state属性
})


export default store
