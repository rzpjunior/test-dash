export default [
    {
        path: '/configuration/warehouse',
        name: 'WarehouseList',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Warehouse List'
        }
    },
    {
        path: '/configuration/warehouse/detail/:id',
        name: 'WarehouseDetail',
        component: () => import("./Detail"),
        meta: {
            auth: true,
            title: 'Warehouse Detail',
            breadcrumbs : [
                {
                    text: 'Warehouse List',
                    to : '/configuration/warehouse'
                },
                {
                    text: 'Detail Warehouse',
                },
            ],
        }
    },
    {
        path: '/configuration/warehouse/update/:id',
        name: 'WarehouseUpdate',
        component: () => import("./Update.vue"),
        meta: {
            auth: true,
            title: 'Warehouse Update',
            breadcrumbs : [
                {
                    text: 'Warehouse List',
                    to : '/configuration/warehouse'
                },
                {
                    text: 'Update Warehouse',
                },
            ],
        }
    },
]