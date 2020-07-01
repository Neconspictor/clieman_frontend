import moment from 'moment-timezone'

const SettingsModule = {
    namespaced: true,
    state: {
        calendarOptions: {
            workingRange: {
                start: moment('08:00', 'HH:mm').toDate(),
                end: moment('18:00', 'HH:mm').toDate(),
            },
        },

        languages: [
            {
                label: 'Deutsch',
                lang: 'de',
            },
            {
                label: 'English',
                lang: 'en',
            },
        ],
    },
    mutations: {
        SET_CALENDER_OPTIONS(state, options) {
            state.calendarOptions = options
        },
    },
    actions: {
        setCalendarOptions({ commit }, options) {
            commit('SET_CALENDER_OPTIONS', options)
        },
    },
    getters: {
        getCalendarOptions: state => state.calendarOptions,

        getLanguage: state => langID => {
            for (let language of state.languages) {
                if (language.lang === langID) return language
            }

            return null
        },
    },
}

export default SettingsModule
