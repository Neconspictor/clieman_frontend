import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import de from '@/plugins/vue-i18n/de'
import en from '@/plugins/vue-i18n/en'

const messages = {
    en: en.messages,
    de: de.messages,
}

const dateTimeFormats = {
    en: en.dateTimeFormats,
    de: de.dateTimeFormats,
}

export default new VueI18n({ locale: 'en', messages, dateTimeFormats })
