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
// In main.js
import LoadScript from 'vue-plugin-load-script'
import IconifyIcon from '@iconify/vue'

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
    render: h => h(App),
}).$mount('#app')

store
    .dispatch('fetchClients')
    .then(() => {
        store
            .dispatch('fetchEvents')
            .then(() => {
                store.commit('RESOLVE_CLIENT_REFERENCES', store.getters)
            })
            .catch(e => {
                console.log("Couldn't fetch events: ", e)
            })
    })
    .catch(e => {
        console.log("Couldn't fetch clients: ", e)
    })

/*const testClient = {
    id: 'TheRealHansi',
    forename: 'Hansi',
    name: 'Göttling',
    address: 'Sumpf',
    mobile: '',
    birthday: new Date('1972/05/12'),
    email: 'hansi.goettling@gmx.de',
    sex: 'male',
}

store.dispatch('addClient', testClient)*/
