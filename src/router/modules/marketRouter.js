/** 商城管理路由 **/

import Layout from '@/layout'

const monitorRouter = {
    path: '/market',
    component: Layout,
    redirect: '/market/goods',
    name: 'marketRoyter',
    meta: {
        title: '商城管理',
        icon: 'shopping'
    },
    children: [
        {
            path: 'goods',
            component: () => import('@/views/market/goods'),
            name: 'Goods',
            meta: { title: '商品分类' }
        },
        {
            path: 'brand',
            component: () => import('@/views/market/brand'),
            name: 'Brand',
            meta: { title: '商品品牌' }
        },
        {
            path: 'type',
            component: () => import('@/views/market/type'),
            name: 'Type',
            meta: { title: '商品类型' }
        },
        {
            path: 'attribute',
            component: () => import('@/views/market/attribute'),
            name: 'Attribute',
            meta: { title: '商品属性' }
        },
        {
            path: 'gui',
            component: () => import('@/views/market/gui'),
            name: 'GUI',
            meta: { title: '商品规格' }
        },
        {
            path: 'manage',
            component: () => import('@/views/market/manage'),
            name: 'Manage',
            meta: { title: '商品管理' }
        },
        {
            path: 'coupon',
            component: () => import('@/views/market/coupon'),
            name: 'Coupon',
            meta: { title: '优惠卷' }
        },
        {
            path: 'order',
            component: () => import('@/views/market/order'),
            name: 'Order',
            meta: { title: '订单管理' }
        },
        {
            path: 'info',
            component: () => import('@/views/market/info'),
            name: 'Info',
            meta: { title: '会员信息' }
        }
    ]
}
export default monitorRouter
