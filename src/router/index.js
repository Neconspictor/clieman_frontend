import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Clients from '@/views/Clients'
import Settings from '@/views/Settings'

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
