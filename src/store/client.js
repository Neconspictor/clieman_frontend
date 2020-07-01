const ClientModule = {
    namespaced: true,
    state: {
        clients: [],
        idToClient: new Map(),
    },
    mutations: {
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

        DELETE_CLIENT(state, id) {
            const index = state.clients.findIndex(e => e.id === id)
            if (index != -1) {
                // splice ensures that Vue recognizes the changes
                state.clients.splice(index, 1)
                state.idToClient.delete(id)
            }
        },

        SET_CLIENTS(state, clients) {
            state.clients = clients

            // update id mappings
            state.idToClient = new Map()
            for (const client of state.clients) {
                state.idToClient.set(client.id, client)
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
    },
    actions: {
        addClient({ commit }, client) {
            commit('ADD_CLIENT', client)
        },

        deleteClient({ commit }, client) {
            commit('DELETE_CLIENT', client.id)
        },

        async fetchClients({ commit, state, rootState }) {
            const snapshot = await rootState.firebaseDB
                .collection('clients')
                .get()

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

        updateClient({ commit }, client) {
            commit('UPDATE_CLIENT', client)
        },
    },
    getters: {
        getClientByID: state => id => {
            return state.idToClient.get(id)
        },
    },
}

export default ClientModule
