export default [
    {
        path: '/promotion/voucher',
        name: 'Voucher',
        component: () => import("./Index.vue"),
        alias: '/role/index',
        meta: {
            auth: true,
            title: 'Voucher'
        }
    },
    {
        path: '/promotion/voucher/create',
        name: 'VoucherCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Voucher Create'
        }
    },
    {
        path: '/promotion/voucher/:id',
        name:'VoucherDetail',
        component: () => import("./Detail"),
        meta: {
            auth: true,
            title: 'Voucher Detail'
        },
        props: true,
    },
]