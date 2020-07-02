import axios from 'axios'
import { mapGetters } from 'vuex'

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
            ] = `Bearer ${state.user.token}`
        },
        CLEAR_USER_DATA(state) {
            state.user = null
            localStorage.setItem('user', null)
            axios.defaults.headers.common['Authorization'] = null
        },
    },
    actions: {
        register({ commit }, credentials) {
            return axios
                .post('//localhost:3000/register', credentials)
                .then(({ data }) => {
                    // const data = response.data
                    commit('SET_USER_DATA', data)
                })
        },
        login({ commit }, credentials) {
            return axios
                .post('//localhost:3000/login', credentials)
                .then(({ data }) => {
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
    },
    getters: {
        loggedIn(state) {
            return !!state.user
        },
    },
}

export default AuthenticationModule

export const authComputed = {
    ...mapGetters(['loggedIn']),
}
