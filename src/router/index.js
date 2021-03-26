import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import store from "../store/index.js";

Vue.use(Router);

/**
 * Auto register other routes
 * setiap file.js di directory views yang mempunyai route.js
 * akan diregisterkan sebagai route
 */
let path =[]
let route =[]
const comps = require.context('../views/', true, /\.(js)$/i);
comps.keys().map(key => {
    path.push(comps(key).default)

});
path.forEach((value, index) => {
    if(value !== undefined){
        value.forEach((c, index) => {
            route.push(c)
        });

    }

});
route.push({
    path: "/",
    name: "Login",
    component: Login,
    meta: {
        title:"Login",
        guest: true
    }
})
route.push({
    path: "/Home",
    name: "Home",
    component: Home,
    meta: {
        title:"Home",
    }
})
let router =  new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes:route,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (store.getters.isLoggedIn !== '' && to.path !== '/') {
            next();
        } else {
            next({
                path: "/",
            });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.isLoggedIn !== ''  && to.path === '/') {
            next({
                path: "/home",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;