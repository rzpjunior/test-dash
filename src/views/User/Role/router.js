export default [
    {
        path: '/user/role',
        name: 'Role',
        component: () => import("./Index.vue"),
        alias: '/role/index',
        meta: {
            auth: true,
            title: 'Role'
        }
    },
    {
        path: '/user/role/detail/:id',
        name: 'RoleDetail',
        component: () => import("./Detail"),
        meta: {
            auth: true,
            title: 'Role Detail'
        }
    },
    {
        path: '/user/role/update/:id',
        name:'RoleUpdate',
        component: () => import("./Update"),
        alias:'/role/update',
        meta: {
            auth: true,
            title: 'Role Update'
        },
        props: true,
    },
    {
        path: '/user/role/create',
        name: 'RoleCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Role Create'
        }
    },
]