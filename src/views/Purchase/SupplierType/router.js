export default [
    {
        path: '/purchase/supplier_type',
        name: 'SupplierType',
        component: () => import("./Index.vue"),
        alias: '/purchase/supplier_type/v2',
        meta: {
            auth: true,
            title: 'Supplier Type List'
        }
    },
]