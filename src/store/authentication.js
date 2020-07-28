import axios from 'axios'
import { mapGetters } from 'vuex'
import { apiClient } from '@/services/server.js'

const AuthenticationModule = {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        SET_USER_DATA(state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common[
                'Authorization'
            ] = `${state.user.authorizationHeader}`
        },
        CLEAR_USER_DATA(state) {
            state.user = null
            localStorage.setItem('user', null)
            axios.defaults.headers.common['Authorization'] = null
        },
    },
    actions: {
        changeEmail({ commit }, email) {
            return apiClient()
                .post('user/changeEmail', email)
                .then(({ data }) => {
                    commit('SET_USER_DATA', data)
                })
        },

        changeUserName({ commit }, username) {
            return apiClient()
                .post('user/changeUserName', username)
                .then(({ data }) => {
                    commit('SET_USER_DATA', data)
                })
        },

        register({ commit }, credentials) {
            return apiClient()
                .post('public/register', credentials)
                .then(({ data }) => {
                    commit('SET_USER_DATA', data)
                })
        },

        login({ commit }, credentials) {
            return apiClient()
                .post('public/login', credentials)
                .then(({ data, headers }) => {
                    data.authorizationHeader = headers['authorization']
                    commit('SET_USER_DATA', data)
                })
        },
        logout({ commit }) {
            /* return new Promise(function (resolve, reject) {
        commit('CLEAR_USER_DATA')
        resolve()
      }) */
            commit('CLEAR_USER_DATA')
        },

        async testAuthentincationed() {
            try {
                // eslint-disable-next-line no-unused-vars
                let response = await apiClient().get('test')
            } catch (e) {
                return false
            }

            return true
        },
    },
    getters: {
        loggedIn(state) {
            return !!state.user
        },
    },
}

export default AuthenticationModule

export const authComputed = {
    ...mapGetters('authentication', ['loggedIn']),
}
