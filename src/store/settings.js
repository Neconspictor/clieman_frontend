import moment from 'moment-timezone'
import SettingsUtil from '@/util/settings.js'

function persist(name, data) {
    const parsed = JSON.stringify(data)
    localStorage.setItem(name, parsed)
}

// eslint-disable-next-line no-unused-vars
function getLanguage(languages, langID) {
    for (let language in languages)
        if (language.lang === langID) return language

    return null
}

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

        activeLanguage: 'en',

        useDarkTheme: false,
    },
    mutations: {
        SET_CALENDER_OPTIONS(state, options) {
            state.calendarOptions = options
        },

        SET_ACTIVE_LANGUAGE(state, language) {
            state.activeLanguage = language
        },

        SET_USE_DARK_THEME(state, useDarkTheme) {
            state.useDarkTheme = useDarkTheme
        },
    },
    actions: {
        setCalendarOptions({ commit }, options) {
            commit('SET_CALENDER_OPTIONS', options)
            persist('settings.calendarOptions', options)
        },

        setActiveLanguage({ commit }, lang) {
            SettingsUtil.setActiveLanguage(lang)
            commit('SET_ACTIVE_LANGUAGE', lang)
            persist('settings.activeLanguage', lang)
        },

        setUseDarkTheme({ commit }, { vuetify, useDarkTheme }) {
            SettingsUtil.setUseDarkTheme(vuetify, useDarkTheme)
            console.log('store setUseDarkTheme: ' + useDarkTheme)
            commit('SET_USE_DARK_THEME', useDarkTheme)
            persist('settings.useDarkTheme', useDarkTheme)
        },

        async loadStoredSettings({ dispatch }, { vuetify, defaultLanguage }) {
            var calendarOptions = SettingsUtil.load('settings.calendarOptions')
            if (calendarOptions) {
                calendarOptions.workingRange.start = new Date(
                    calendarOptions.workingRange.start
                )

                calendarOptions.workingRange.end = new Date(
                    calendarOptions.workingRange.end
                )
                console.log('calendarOptions: ' + calendarOptions)
                await dispatch('setCalendarOptions', calendarOptions)
            }

            var activeLanguage = SettingsUtil.load('settings.activeLanguage')
            if (activeLanguage) {
                await dispatch('setActiveLanguage', activeLanguage)
            } else {
                await dispatch('setActiveLanguage', defaultLanguage)
            }

            var useDarkTheme = SettingsUtil.load('settings.useDarkTheme')
            if (useDarkTheme) {
                await dispatch('setUseDarkTheme', { vuetify, useDarkTheme })
            }
        },
    },
    getters: {
        getCalendarOptions: state => state.calendarOptions,

        getLanguage: state => langID => {
            for (let language of state.languages)
                if (language.lang == langID) return language

            return null
        },
    },
}

export default SettingsModule
