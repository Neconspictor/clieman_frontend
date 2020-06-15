import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Translation provided by Vuetify (typescript)
import de from 'vuetify/src/locale/de.ts'
import en from 'vuetify/src/locale/en.ts'

export default new Vuetify({
    lang: {
        locales: { de, en },
        current: 'de',
    },
})
