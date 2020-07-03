//import DateUtil from '@/util/date.js'
import { apiClient } from '@/services/server.js'

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
        addEvent({ commit }, event) {
            commit('ADD_EVENT', event)
        },

        deleteEvent({ commit }, event) {
            commit('DELETE_EVENT', event.id)
        },

        async fetchEvents({ commit, state }, getClientByID) {
            const response = await apiClient().get('events')
            const events = response.data.events

            for (let event of events) {
                event.startDate = new Date(event.startDate)
                event.endDate = new Date(event.endDate)
            }

            resolveClientReferences(events, getClientByID)

            commit('SET_EVENTS', events)
            return state.events
        },

        updateEvent({ commit }, event) {
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
