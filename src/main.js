import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
import i18n from './plugins/vue-i18n.js'

Vue.use(VueTextareaAutosize)

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

var vm = new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app')

vm.$i18n.locale = vm.$vuetify.lang.current

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
