import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueTextareaAutosize)

Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: 'AIzaSyA4yYD2RAUu1T9DuWP_LMnqptKGkYcFTfE',
    authDomain: 'calendar-test-3ff4d.firebaseapp.com',
    databaseURL: 'https://calendar-test-3ff4d.firebaseio.com',
    projectId: 'calendar-test-3ff4d',
    storageBucket: 'calendar-test-3ff4d.appspot.com',
    messagingSenderId: '617959689199',
    appId: '1:617959689199:web:b094a90677a548f80b041a',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

const ignoreWarnMessage =
    'The .native modifier for v-on is only valid on components but it was used on <div>.'
// eslint-disable-next-line no-unused-vars
Vue.config.warnHandler = function(msg, vm, trace) {
    // `trace` is the component hierarchy trace
    if (msg === ignoreWarnMessage) {
        msg = null
        vm = null
        trace = null
    }
}

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')
