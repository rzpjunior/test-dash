export default [
    {
        path: '/price/product',
        name: 'ProductPrice',
        component: () => import("./Index.vue"),
        alias: '/price/product/v2',
        meta: {
            auth: true,
            title: 'Product Prices List'
        }
    },
    // {
    //     path: '/price/product/export',
    //     name: 'ProductPriceExport',
    //     component: () => import("./Export.vue"),
    //     alias: '/price/product/export/v2',
    //     meta: {
    //         auth: true,
    //         title: 'ProductPriceExport'
    //     }
    // },
    // {
    //     path: '/price/product/update/:id',
    //     name: 'ProductPriceUpdate',
    //     component: () => import("./Update.vue"),
    //     alias: '/price/product/update/:id/v2',
    //     meta: {
    //         auth: true,
    //         title: 'ProductPriceUpdate'
    //     }
    // },
]