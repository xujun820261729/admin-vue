/** 系统监控路由 **/

import Layout from '@/layout'

const monitorRouter = {
    path: '/monitor',
    component: Layout,
    name: 'monitorRoyter',
    redirect: '/monitor/onlineuser',
    meta: {
        title: '系统监控',
        icon: 'component'
    },
    children: [
        {
            path: 'onlineuser',
            component: () => import('@/views/monitor/onlineUser'),
            name: 'OnlineUser',
            meta: { title: '在线用户' }
        },
        {
            path: 'timingTask',
            component: () => import('@/views/monitor/timingTask'),
            name: 'TimingTask',
            meta: { title: '定时任务' }
        }
    ]
}
export default monitorRouter
