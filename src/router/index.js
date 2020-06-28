import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Clients from '@/views/Clients'
import Settings from '@/views/Settings'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'calendar',
        component: Home,
    },

    {
        path: '/clients',
        name: 'clients',
        component: Clients,
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
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
