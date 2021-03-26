export default [
    {
        path: '/customer/branch',
        name: 'Branch',
        component: () => import("./Index.vue"),
        alias: '/customer/Branch/v2',
        meta: {
            auth: true,
            title: 'Branch'
        }
    },
    {
        path: '/customer/branch/detail/:id',
        name: 'BranchDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Branch Detail'
        }
    },
    {
        path: '/customer/branch/create',
        name:'BranchCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Branch Create',
        },
        props: true,
    },
    {
        path: '/customer/branch/update/:id',
        name:'BranchUpdate',
        component: () => import("./Update"),
        alias:'/customer/branch/update/v2/:id',
        meta: {
            auth: true,
            title: 'Branch Update',
        },
        props: true,
    },
    {
        path: '/customer/branch/update/sales/person/:id',
        name:'BranchUpdateSalesPerson',
        component: () => import("./UpdateSalesPerson"),
        alias:'/customer/branch/update/sales/person/v2/:id',
        meta: {
            auth: true,
            title: 'Branch Update Sales Person',
        },
        props: true,
    },
    {
        path: '/customer/branch/convert/archetype/:id',
        name:'BranchConvertArchetype',
        component: () => import("./ConvertArchetype"),
        alias:'/customer/branch/convert/archetype/v2/:id',
        meta: {
            auth: true,
            title: 'Branch Convert Archetype',
        },
        props: true,
    },

]