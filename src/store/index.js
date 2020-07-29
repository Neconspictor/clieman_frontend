import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase.js'
import 'firebase/firestore'

import user from '@/store/user'
import client from '@/store/client'
import event from '@/store/event'
import settings from '@/store/settings'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        client,
        event,
        settings,
    },

    state: {
        firebaseDB: firebase.init(),
    },
    mutations: {},

    actions: {},

    getters: {},
})
