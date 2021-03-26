export default [
    {
        path: '/configuration/user_profile',
        name: 'UserProfile',
        component: () => import("./Edit.vue"),
        meta: {
            auth: true, 
            title: 'User Profile'
        }
    },
    {
        path: '/user/user/create',
        name: 'UserCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'User Create',
            breadcrumbs : [
                {
                    text: 'List of User',
                    to : '/user/user'
                },
                {
                    text: 'Create User'
                },
            ],
        }
    },
    {
        path: '/user/user/edit',
        name: 'UserEdit',
        component: () => import("./Edit"),
        meta: {
            auth: true,
            title: 'User Edit'
        }
    },
    {
        // path: '/role/detail/:id',
        path: '/user/user/detail/:id',
        name: 'UserDetail',
        component: () => import("./Detail"),
        meta: {
            auth: true,
            title: 'User Detail',
            breadcrumbs : [
                {
                    text: 'List of User',
                    to : '/user/user'
                },
                {
                    text: 'User Details',
                },
            ],
        }
    },
    {
        path: '/user/user/update/:id',
        name:'UserUpdate',
        component: () => import("./Update"),
        meta: {
            auth: true,
            title: 'User Update'
        },
        props: true,
    },
    {
        path: '/user/user/update/permission/:id',
        name:'UserUpdatePermission',
        component: () => import("./UpdatePermission"),
        meta: {
            auth: true,
            title: 'User Update Permission'
        },
        props: true,
    },
]