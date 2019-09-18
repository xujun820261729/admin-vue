import store from '@/store'

const { body } = document
const WIDTH = 992 // 参考Bootstrap's 的设计标准,当像素达到992px时,触发左边的菜单栏功能

export default {
    watch: {
        $route(route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    },
    beforeMount() {
        // resize 监听浏览器变化触发
        window.addEventListener('resize', this.$_resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    mounted() {
        const isMobile = this.$_isMobile()
        if (isMobile) {
            store.dispatch('app/toggleDevice', 'mobile')
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
    },
    methods: {
    // 用 $_ 为 mixins 设置独有的方法名字
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
        $_isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        },
        $_resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.$_isMobile()
                store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                    store.dispatch('app/closeSideBar', { withoutAnimation: true })
                }
            }
        }
    }
}
