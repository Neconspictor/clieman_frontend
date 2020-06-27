import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase.js'
import 'firebase/firestore'
import DateUtil from '@/util/date.js'
import moment from 'moment-timezone'

Vue.use(Vuex)
const firebaseDB = firebase.init()

export default new Vuex.Store({
    state: {
        clients: [],
        idToClient: new Map(),
        idToEvent: new Map(),
        events: [],
        calendarOptions: {
            workingRange: {
                start: moment('08:00', 'HH:mm').toDate(),
                end: moment('18:00', 'HH:mm').toDate(),
            },
        },
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

            // update id mappings
            state.idToEvent = new Map()
            for (const event of state.events) {
                state.idToEvent.set(event.id, event)
            }
        },

        UPDATE_CLIENT(state, client) {
            // find matching client by its id
            const findResult = state.clients
                .map((x, index) => [index, x])
                .filter(x => x[1].id === client.id)

            //assure that we have found exactly one
            if (findResult.length === 0) {
                throw "Didn't found client with id " + client.id
            } else if (findResult.length > 1) {
                throw 'State exception: Multiple clients have the same id'
            }

            let index = findResult[0][0]

            // Ensure that Vue recognizes the changes
            // splice methods can be used for this
            state.clients.splice(index, 1, client)
            state.clients = Object.assign([], state.clients)
            state.idToClient.set(client.id, client)
        },

        UPDATE_EVENT(state, event) {
            // find matching event by its id
            const findResult = state.events
                .map((x, index) => [index, x])
                .filter(x => x[1].id === event.id)

            //assure that we have found exactly one
            if (findResult.length === 0) {
                throw "Didn't found event with id " + event.id
            } else if (findResult.length > 1) {
                throw 'State exception: Multiple events have the same id'
            }

            let index = findResult[0][0]

            // Ensure that Vue recognizes the changes
            // splice methods can be used for this
            state.events.splice(index, 1, event)
            //Vue.set(state.events, index, event)
            //state.events[index] = event
            // We reassign the events array so that Vue realizes that something has changed
            //state.events = Object.assign([], state.events)
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

        DELETE_EVENT(state, id) {
            const index = state.events.findIndex(e => e.id === id)
            if (index != -1) {
                // splice ensures that Vue recognizes the changes
                state.events.splice(index, 1)
                state.idToEvent.delete(id)
            }
        },

        ADD_EVENT(state, event) {
            //ensure that we don't add an event twice
            if (state.idToEvent.get(event.id)) {
                throw 'State exception: An event with id ' +
                    event.id +
                    ' already exists'
            }

            state.events.push(event)
            state.idToEvent.set(event.id, event)
        },

        ADD_CLIENT(state, client) {
            //ensure that we don't add a client twice
            if (state.idToClient.get(client.id)) {
                throw 'State exception: A client with id ' +
                    client.id +
                    ' already exists'
            }

            state.clients.push(client)
            state.idToClient.set(client.id, client)
        },

        SET_CALENDER_OPTIONS(state, options) {
            state.calendarOptions = options
        },
    },

    actions: {
        addClient({ commit }, client) {
            commit('ADD_CLIENT', client)
        },

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

            if (clients.length > 0) commit('SET_CLIENTS', clients)
            return state.clients
        },

        async fetchEvents({ commit, state }) {
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

        updateClient({ commit }, client) {
            commit('UPDATE_CLIENT', client)
        },

        updateEvent({ commit }, event) {
            commit('UPDATE_EVENT', event)
        },

        deleteEvent({ commit }, event) {
            commit('DELETE_EVENT', event.id)
        },

        addEvent({ commit }, event) {
            commit('ADD_EVENT', event)
        },

        setCalendarOptions({ commit }, options) {
            commit('SET_CALENDER_OPTIONS', options)
        },
    },

    getters: {
        getClientByID: state => id => {
            return state.idToClient.get(id)
        },

        getEventByID: state => id => {
            return state.idToEvent.get(id)
        },

        getCalendarOptions: state => state.calendarOptions,
    },
    modules: {},
})
