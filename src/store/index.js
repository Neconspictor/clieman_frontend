import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase.js'

Vue.use(Vuex)
const firebaseDB = firebase.init()

function formatDate(d) {
    return (
        d.getUTCFullYear() +
        '-' +
        (d.getUTCMonth() + 1) +
        '-' +
        d.getUTCDate() +
        ' ' +
        d.getUTCHours() +
        ':' +
        d.getUTCMinutes()
    )
}

export default new Vuex.Store({
    state: {
        clients: [],
        idToClient: new Map(),
        clientDates: [],
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

        SET_CLIENT_DATES(state, clientDates) {
            state.clientDates = clientDates
        },

        RESOLVE_CLIENT_REFERENCES(state, getters) {
            for (const date of state.clientDates) {
                for (let i = 0; i < date.clients.length; ++i) {
                    date.clients[i] = getters.getClientByID(
                        date.clients[i].trim()
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
                let appData = data
                appData.birthday = new Date(appData.birthday.seconds * 1000)
                appData.id = doc.id
                clients.push(appData)
            })

            commit('SET_CLIENTS', clients)
            return state.clients
        },

        async fetchClientDates({ commit, state }) {
            const snapshot = await firebaseDB.collection('clientDates').get()

            const clientDates = []

            snapshot.forEach(doc => {
                let data = doc.data()
                let appData = data
                appData.id = doc.id

                appData.start = formatDate(
                    new Date(appData.start.seconds * 1000)
                )
                appData.end = formatDate(new Date(appData.end.seconds * 1000))

                clientDates.push(appData)
            })

            commit('SET_CLIENT_DATES', clientDates)
            return state.clientDates
        },
    },

    getters: {
        getClientByID: state => id => {
            return state.idToClient.get(id)
        },
    },
    modules: {},
})
