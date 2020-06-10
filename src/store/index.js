import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase.js'
import 'firebase/firestore'
import DateUtil from '@/util/date.js'

/*import moment from 'moment-timezone'

function formatDate(d) {
    return d.tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
}*/

Vue.use(Vuex)
const firebaseDB = firebase.init()

export default new Vuex.Store({
    state: {
        clients: [],
        idToClient: new Map(),
        events: [],
    },
    mutations: {
        SET_CLIENTS(state, clients) {
            state.clients = clients

            // update id mappings
            state.idToClient = new Map()
            for (const client of state.clients) {
                state.idToClient.set(client.id, client)
            }
        },

        SET_EVENTS(state, events) {
            state.events = events
        },

        RESOLVE_CLIENT_REFERENCES(state, getters) {
            for (const event of state.events) {
                for (let i = 0; i < event.clients.length; ++i) {
                    event.clients[i] = getters.getClientByID(
                        event.clients[i].trim()
                    )
                }
            }
        },
    },
    actions: {
        async fetchClients({ commit, state }) {
            const snapshot = await firebaseDB.collection('clients').get()

            const clients = []

            snapshot.forEach(doc => {
                let data = doc.data()
                let client = data
                client.birthday = client.birthday.toDate()
                client.id = doc.id
                clients.push(client)
            })

            commit('SET_CLIENTS', clients)
            return state.clients
        },

        async fetchClientDates({ commit, state }) {
            const snapshot = await firebaseDB.collection('clientDates').get()

            const events = []

            snapshot.forEach(doc => {
                let data = doc.data()
                let event = data
                event.id = doc.id

                event.startDate = event.start.toDate()
                event.start = DateUtil.formatDefault(event.startDate)
                event.endDate = event.end.toDate()
                event.end = DateUtil.formatDefault(event.endDate)

                events.push(event)
            })

            commit('SET_EVENTS', events)
            return state.events
        },
    },

    getters: {
        getClientByID: state => id => {
            return state.idToClient.get(id)
        },
    },
    modules: {},
})
