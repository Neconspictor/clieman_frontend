import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from '@/components/extern/TextareaAutosize'
import i18n from './plugins/vue-i18n'
// Import the Vuetify styles somewhere global
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import 'vuetify/src/styles/styles.sass'

import LoadScript from 'vue-plugin-load-script'
import IconifyIcon from '@iconify/vue'
import Axios from 'axios'

Vue.use(IconifyIcon)
Vue.use(VueTextareaAutosize)
Vue.use(LoadScript)

Vue.config.productionTip = false

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

Vue.loadScript('https://code.iconify.design/1/1.0.7/iconify.min.js')

i18n.locale = vuetify.userPreset.lang.current

// eslint-disable-next-line no-unused-vars
var vm = new Vue({
    router,
    store,
    vuetify,
    i18n,
    created() {
        const userString = localStorage.getItem('user')
        try {
            const user = JSON.parse(userString)
            this.$store.commit('authentication/SET_USER_DATA', user)
            // eslint-disable-next-line no-empty
        } catch (error) {}

        Axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('authentication/logout').then(() => {
                        console.log('location: ', location)

                        if (
                            location.pathname !== '/login' &&
                            location.pathname !== '/register'
                        ) {
                            location.reload()
                        }
                    })
                }
                return Promise.reject(error)
            }
        )
    },
    render: h => h(App),
}).$mount('#app')
