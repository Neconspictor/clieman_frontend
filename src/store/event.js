//import DateUtil from '@/util/date.js'
import { apiClient } from '@/services/server.js'
import rfdc from 'rfdc'

// eslint-disable-next-line no-unused-vars
function resolveClientReferences(events, getClientByID) {
    for (const event of events) {
        for (let i = 0; i < event.clients.length; ++i) {
            event.clients[i] = getClientByID(event.clients[i].trim())
        }
    }
}

const EventModule = {
    namespaced: true,
    state: {
        idToEvent: new Map(),
        events: [],
    },
    mutations: {
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
        DELETE_EVENT(state, id) {
            const index = state.events.findIndex(e => e.id === id)
            if (index != -1) {
                // splice ensures that Vue recognizes the changes
                state.events.splice(index, 1)
                state.idToEvent.delete(id)
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
    },
    actions: {
        async addEvent({ commit }, event) {
            const sendEvent = rfdc()(event)
            sendEvent.clients = event.clients.map(client => client.id)

            await apiClient().post('events/add', sendEvent)
            commit('ADD_EVENT', event)
        },

        async deleteEvent({ commit }, event) {
            await apiClient().post('events/remove', { id: event.id })
            commit('DELETE_EVENT', event.id)
        },

        async fetchEvents({ commit, state }, getClientByID) {
            var response
            try {
                response = await apiClient().get('events/getAll')
            } catch (e) {
                commit('SET_EVENTS', [])
                throw e
            }

            const events = response.data

            for (let event of events) {
                event.start = new Date(event.start)
                event.end = new Date(event.end)
                //event.startDate = new Date(event.startDate)
                //event.endDate = new Date(event.endDate)
            }

            resolveClientReferences(events, getClientByID)

            commit('SET_EVENTS', events)
            return state.events
        },

        async updateEvent({ commit }, event) {
            const sendEvent = rfdc()(event)
            sendEvent.clients = event.clients.map(client => client.id)

            await apiClient().post('events/update', sendEvent)

            commit('UPDATE_EVENT', event)
        },
    },
    getters: {
        getEventByID: state => id => {
            return state.idToEvent.get(id)
        },
    },
}

export default EventModule
