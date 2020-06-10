import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
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

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')

Promise.all([store.dispatch('fetchClients'), store.dispatch('fetchEvents')])
    .then(() => {
        store.commit('RESOLVE_CLIENT_REFERENCES', store.getters)
        console.log('clients : ', store.state.clients)
        console.log('events : ', store.state.events)
    })
    .catch(e => {
        console.log("Couldn't fetch clients or client dates: ", e)
    })
