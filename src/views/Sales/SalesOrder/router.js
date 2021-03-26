export default [
    {
        path: '/sales-order',
        name: 'SalesOrderList',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Sales Order List'
        }
    }
]