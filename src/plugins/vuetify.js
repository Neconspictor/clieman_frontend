import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
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

    icons: {
        iconfont: 'mdi',
    },

    theme: {
        dark: false,
    },
})
