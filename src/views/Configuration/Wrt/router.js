export default [
    {
        path: '/configuration/wrt',
        name: 'Wrt',
        component: () => import("./Index.vue"),
        alias: '/configurationWrt',
        meta: {
            auth: true,
            title: 'WRT'
        }
    },
    {
        path: '/wrt/create',
        name: 'WrtCreate',
        component: () => import("./Create.vue"),
        meta: {
            auth: true,
            title: 'WRT Create',
            breadcrumbs : [
                {
                    text: 'WRT',
                    to : '/wrt'
                },
                {
                    text: 'Create WRT',
                },
            ],
        }
    },
]