import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Clients from '@/views/Clients'

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
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
