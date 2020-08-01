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
    },
    mutations: {
        SET_CALENDER_OPTIONS(state, options) {
            state.calendarOptions = options
        },

        SET_ACTIVE_LANGUAGE(state, language) {
            state.activeLanguage = language
        },
    },
    actions: {
        setCalendarOptions({ commit }, options) {
            commit('SET_CALENDER_OPTIONS', options)
            persist('settings.calendarOptions', options)
        },

        setActiveLanguage({ commit }, lang) {
            console.log('setActiveLanguage: ' + lang)
            SettingsUtil.setActiveLanguage(lang)
            commit('SET_ACTIVE_LANGUAGE', lang)
            persist('settings.activeLanguage', lang)
        },

        async loadStoredSettings({ dispatch }, defaultLanguage) {
            var calendarOptions = SettingsUtil.load('settings.calendarOptions')
            if (calendarOptions) {
                await dispatch('setCalendarOptions', calendarOptions)
            }

            var activeLanguage = SettingsUtil.load('settings.activeLanguage')
            if (activeLanguage) {
                await dispatch('setActiveLanguage', activeLanguage)
            } else {
                await dispatch('setActiveLanguage', defaultLanguage)
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
