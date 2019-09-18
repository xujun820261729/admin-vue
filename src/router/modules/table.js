/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
        title: '商品管理',
        icon: 'table'
    },
    children: [
        {
            path: 'complex-table',
            component: () => import('@/views/table/complex-table'),
            name: 'ComplexTable',
            meta: { title: '商品管理' }
        }
    ]
}
export default tableRouter
