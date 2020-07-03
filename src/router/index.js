import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '@/views/Calendar'
import Clients from '@/views/Clients'
import Settings from '@/views/Settings'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'calendar',
        component: Calendar,
        meta: { requiresAuth: true },
    },

    {
        path: '/clients',
        name: 'clients',
        component: Clients,
        meta: { requiresAuth: true },
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
    },

    {
        path: '/register',
        name: 'register',
        component: Register,
    },

    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: { requiresAuth: true },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const loggedIn = user !== null

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        return next({ name: 'login' })
    }
    next()
})

export default router
