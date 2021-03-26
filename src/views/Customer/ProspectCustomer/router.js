export default [
    {
        path: '/customer/prospect-customer',
        name: 'ProspectCustomer',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Prospect Customer'
        }
    },
    // {
    //     path: '/customer/tag/create',
    //     name: 'TagCreate',
    //     component: () => import("./Create"),
    //     meta: {
    //         auth: true,
    //         title: 'Customer Tag Create'
    //     }
    // },
    {
        path: '/customer/prospect-customer/:id',
        name:'ProspectCustomerDetail',
        component: () => import("./Detail"),
        meta: {
            auth: true,
            title: 'Prospect Customer',
            breadcrumbs : [
                {
                    text: 'Prospect Customer',
                    to: '/customer/prospect-customer'
                },
                {
                    text: 'Detail'
                }
            ]
        },
        props: true,
    },
    // {
    //     path: '/outlet/create/',
    //     name:'BranchCreate',
    //     component: () => import("../Branch/Create"),
    //     props: true,
    // },
    // {
    //     path: '/customer/tag/unarchive/:id',
    //     name:'TagUnarchive',
    //     component: () => import("./Unarchive"),
    //     alias:'/customer/tag/unarchive/v2/:id',
    //     meta: {
    //         auth: true,
    //         title: 'Customer Tag Unarchive'
    //     },
    //     props: true,
    // }
]