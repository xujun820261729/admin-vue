#### 自定义的指定 directive
1. bind：绑定到元素要执行的操作
2. update：如果在调用指令时候，传了参数，当参数变化时候，就会执行update所指定的方法
3. unbind ：解绑要执行的操作
4. demo:
    directives:{
    　　hello:{
    　　　　bind:function(){},
    　　　　update:function(){},
    　　　　unbind:function(){}
    　　}
    }
5. https://cn.vuejs.org/v2/guide/custom-directive.html



##### 明细
1. el-drag-dialog 可以点击头部移动的弹框
2. waves 按钮水波纹效果
3. clipboard 拷贝指令
4. el-table 主要用于页面调整时的防抖 https://www.jianshu.com/p/2089f3a5b9a4


#####  FAQ
1. Q:为什么使用  Vue.use(install)?
A:当前的理解:全局定义指令,需要用component内置的install方法处理


