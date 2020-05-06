import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['../views/Home'], resolve),
        /*children: [
            {
                path: '/home',
                name: 'home-index',
                meta: { scrollToTop: true },
                component: resolve => require(['./views/Home/Children/HomeIndex'], resolve),
            },
        ]*/
    },
    {
        path: '/classify',
        name: 'classify',
        component: resolve => require(['../views/Classify'], resolve)
    },
    {
        path: '/search',
        name: 'search',
        component: resolve => require(['../views/Search'], resolve)
    },
    {
        path: '/find',
        name: 'find',
        component: resolve => require(['../views/Find'], resolve)
    },
    {
        path: '/cart',
        name: 'cart',
        component: resolve => require(['../views/Cart'], resolve)
    },
    {
        path: '/user',
        name: 'user',
        component: resolve => require(['../views/User'], resolve)
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {/*
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (savedPosition) {
                    // savedPosition is only available for popstate navigations.
                    resolve(savedPosition);
                } else {
                    const position = {};
                    // new navigation.
                    // scroll to anchor by returning the selector
                    if (to.hash) {
                        position.selector = to.hash
                    }
                    // check if any matched route config has meta that requires scrolling to top
                    if (to.matched.some(m => m.meta.scrollToTop)) {
                        // cords will be used if no selector is provided,
                        // or if the selector didn't match any element.
                        position.x = 0;
                        position.y = 0;
                    }
                    // if the returned position is false or an empty object,
                    // will retain current scroll position.
                    resolve(position);
                }
                resolve({ x: 0, y: 0 });
            }, 300)
        })*/
    }
})

export default router
