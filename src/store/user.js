import axios from 'axios'
import { mapGetters } from 'vuex'
import { apiClient } from '@/services/server.js'

const UserModule = {
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
                .then(({ data, headers }) => {
                    data.authorizationHeader = headers['authorization']
                    commit('SET_USER_DATA', data)
                })
        },

        changeUserName({ commit }, username) {
            return apiClient()
                .post('user/changeUsername', username)
                .then(({ data, headers }) => {
                    data.authorizationHeader = headers['authorization']
                    commit('SET_USER_DATA', data)
                })
        },

        deleteUser({ commit }, password) {
            return apiClient()
                .post('user/deleteUser', password)
                .then(() => {
                    commit('CLEAR_USER_DATA')
                })
        },

        // eslint-disable-next-line no-unused-vars
        register({ commit }, credentials) {
            return apiClient().post('public/register', credentials)
        },

        // eslint-disable-next-line no-unused-vars
        sendToken({ commit }, email) {
            return apiClient().post('public/sendVerificationCode', email)
        },

        // eslint-disable-next-line no-unused-vars
        verify({ commit }, token) {
            return apiClient().post('public/confirmUser', token)
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

        test() {
            return apiClient().get('public/test')
        },
    },
    getters: {
        loggedIn(state) {
            return !!state.user
        },
    },
}

export default UserModule

export const userComputed = {
    ...mapGetters('user', ['loggedIn']),
}
