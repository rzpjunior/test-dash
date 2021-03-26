export default [
    {
        path: '/warehouse/delivery-order',
        name: 'DeliveryOrder',
        component: () => import("./Index"),
        meta: {
            auth: true,
            title: 'Delivery Order List'
        }
    },
    {
        path: '/customer/merchant/pdf',
        name: 'PDF',
        component: () => import("./Pdf.vue"),
        alias: '/customer/merchant/v2',
        meta: {
            auth: true,
            title: 'PDF'
        }
    },
    {
        path: '/warehouse/delivery-order/create',
        name: 'DeliveryOrderCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Delivery Order',
            breadcrumbs : [
                {
                    text: 'Delivery Order',
                    to : '/warehouse/delivery-order'
                },
                {
                    text: 'Create Delivery Order',
                },
            ],
        }
    },
    {
        path: '/warehouse/delivery-order/confirm',
        name: 'DeliveryOrderConfirm',
        component: () => import("./Confirm"),
        meta: {
            auth: true,
            title: 'Delivery Order',
            breadcrumbs : [
                {
                    text: 'Delivery Order',
                    to : '/warehouse/delivery-order'
                },
                {
                    text: 'Confirm Delivery Order',
                },
            ],
        }
    },
    {
        path: '/warehouse/delivery-order/detail/:id',
        name: 'DeliveryOrderDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Delivery Order Detail',
            breadcrumbs: [
                {
                    text: 'Delivery Order List',
                    to: '/warehouse/delivery-order'
                },
                {
                    text: 'Deliver Order Detail'
                }
            ]
        }
    }
]
