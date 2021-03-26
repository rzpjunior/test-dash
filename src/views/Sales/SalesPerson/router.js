export default [
    {
        path: '/sales/person',
        name: 'SalesPerson',
        component: () => import("./Index.vue"),
        alias: '/sales/person/v2',
        meta: {
            auth: true,
            title: 'Salesperson List'
        }
    },
    {
        path: '/sales/person/archive/:id',
        name:'SalesPersonArchive',
        component: () => import("./Archive"),
        alias:'/sales/person/archive/v2/:id',
        meta: {
            auth: true,
            title: 'Salesperson Archive',
        },
        props: true,
    },
    {
        path: '/sales/person/unarchive/:id',
        name:'SalesPersonUnarchive',
        component: () => import("./Unarchive"),
        alias:'/sales/person/unarchive/v2/:id',
        meta: {
            auth: true,
            title: 'Salesperson Unarchive'
        },
        props: true,
    }
]