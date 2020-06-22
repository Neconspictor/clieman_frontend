import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { ClickOutside } from 'vuetify/lib/directives'

Vue.use(Vuetify)

// Translation provided by Vuetify (typescript)
import de from 'vuetify/src/locale/de.ts'
import en from 'vuetify/src/locale/en.ts'

export default new Vuetify({
    lang: {
        locales: { de, en },
        current: 'de',
    },

    directives: {
        ClickOutside,
    },
})
