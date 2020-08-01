class SettingsUtil {
    static vuetify = null
    static i18n = undefined

    static setActiveLanguage(language) {
        SettingsUtil.vuetify.lang.current = language
        SettingsUtil.i18n.locale = SettingsUtil.vuetify.lang.current
    }

    static setUseDarkTheme(vuetify, useDark) {
        console.log('before: ' + vuetify.theme.dark)
        vuetify.theme.dark = useDark
        console.log('after: ' + vuetify.theme.dark)
    }

    static persist(name, data) {
        const parsed = JSON.stringify(data)
        localStorage.setItem(name, parsed)
    }

    static load(name) {
        const serialized = localStorage.getItem(name)
        return JSON.parse(serialized)
    }

    static init(vuetify, i18n) {
        SettingsUtil.vuetify = vuetify
        SettingsUtil.i18n = i18n
    }
}

export default SettingsUtil
