export default [
    {
        path: '/item',
        name: 'Item',
        component: () => import("./Item.vue"),
        // alias: '/item',
        meta: {
            auth: true,
            title: 'Item'
        }
    },
    {
        path: '/item/detail/:id',
        name:'InventoryItemDetail',
        component: () => import("./Detail"),
        alias:'/item/Detail',
        meta: {
            auth: true,
            title: 'Item Detail'
        },
        props: true,
    },
    {
        path: '/item/update/:id',
        name:'InventoryItemUpdate',
        component: () => import("./Update"),
        alias:'/item/update',
        meta: {
            auth: true,
            title: 'Item Update'
        },
        props: true,
    },
    {
        path: '/item/create',
        name: 'InventoryItemCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Item Create'
        }
    },
]